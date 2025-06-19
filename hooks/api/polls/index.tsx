import { BASE_URL } from '@/constants';
import { Announcement } from '@/utils/api/announcements';
import { respondPoll } from '@/utils/api/polls';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { io, Socket } from 'socket.io-client';

// Initialize Socket.IO client
const socket: Socket = io(BASE_URL, {
  transports: ['websocket'],
  autoConnect: false,
});

export const useRespondPoll = (announcementId: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: respondPoll,
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Poll response submitted',
      });
      queryClient.invalidateQueries({ queryKey: ['generalAnnouncements'] });
      queryClient.invalidateQueries({ queryKey: ['courseAnnouncements'] });
    },
    onError: (error: Error) => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'Failed to submit poll response',
      });
    },
  });

  useEffect(() => {
    socket.connect();
    socket.emit('joinRoom', `announcement_${announcementId}`);

    socket.on('pollResponse', (data: { poll_id: number; option_id: number }) => {
      queryClient.setQueryData<Announcement[]>(['generalAnnouncements'], (old) => {
        if (!old) return old;
        return old.map((ann) =>
          ann.announcement_id === announcementId
            ? {
                ...ann,
                Polls: ann.Polls.map((poll) =>
                  poll.poll_id === data.poll_id
                    ? {
                        ...poll,
                        options: poll.options.map((opt) =>
                          opt.option_id === data.option_id
                            ? { ...opt, votes: opt.votes + 1 }
                            : opt
                        ),
                      }
                    : poll
                ),
              }
            : ann
        );
      });

      queryClient.setQueryData<Announcement[]>(['courseAnnouncements'], (old) => {
        if (!old) return old;
        return old.map((ann) =>
          ann.announcement_id === announcementId
            ? {
                ...ann,
                Polls: ann.Polls.map((poll) =>
                  poll.poll_id === data.poll_id
                    ? {
                        ...poll,
                        options: poll.options.map((opt) =>
                          opt.option_id === data.option_id
                            ? { ...opt, votes: opt.votes + 1 }
                            : opt
                        ),
                      }
                    : poll
                ),
              }
            : ann
        );
      });
    });

    return () => {
      socket.emit('leaveRoom', `announcement_${announcementId}`);
      socket.disconnect();
    };
  }, [announcementId, queryClient]);

  return mutation;
};