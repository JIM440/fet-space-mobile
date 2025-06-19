import { BASE_URL } from '@/constants';
import { Comment as FrontendComment } from '@/types';
import { Comment as ApiComment, createComment, CreateCommentInput, FetchCommentsParams, getComments } from '@/utils/api/comments';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { io, Socket } from 'socket.io-client';

interface SocketCommentEvent {
  comment: ApiComment;
}

const socket: Socket = io(BASE_URL, {
  transports: ['websocket'],
  autoConnect: false,
});

const mapApiCommentToFrontend = (apiComment: ApiComment): FrontendComment => ({
  id: apiComment.comment_id.toString(),
  text: apiComment.content,
  author: apiComment.user.name,
  timestamp: apiComment.created_at,
});

export const useGetComments = ({ type, targetId }: FetchCommentsParams) => {
  const [comments, setComments] = useState<FrontendComment[]>([]);

  const query = useQuery({
    queryKey: ['comments', type, targetId],
    queryFn: () => getComments({ type, targetId, page: 1, limit: 10 }),
    enabled: !!targetId,
  });

  useEffect(() => {
    socket.connect();
    socket.emit('joinRoom', `${type}_${targetId}`);

    socket.on('newComment', (data: SocketCommentEvent) => {
      const frontendComment = mapApiCommentToFrontend(data.comment);
      setComments((prev) => [frontendComment, ...prev]);
      Toast.show({
        type: 'success',
        text1: 'New Comment',
        text2: frontendComment.text,
      });
    });

    return () => {
      socket.emit('leaveRoom', `${type}_${targetId}`);
      socket.disconnect();
    };
  }, [type, targetId]);

  useEffect(() => {
    if (query.data) {
      setComments(query.data.map(mapApiCommentToFrontend));
    }
  }, [query.data]);

  return { ...query, comments };
};

export const useCreateComment = (targetId: number, type: 'courseAnnouncement' | 'generalAnnouncement') => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCommentInput) => createComment(data),
    onSuccess: (response) => {
        console.log(response, 'response from create comment');
      queryClient.invalidateQueries({ queryKey: ['comments', type, targetId] });
      socket.emit('newComment', { comment: response.comment }, `${type}_${targetId}`);
    },
    onError: (error: Error) => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'Failed to add comment',
      });
    },
  });
};