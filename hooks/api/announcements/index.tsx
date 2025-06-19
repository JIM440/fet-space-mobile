import { BASE_URL } from '@/constants/index';
import { getCourseAnnouncementDetails, getCourseAnnouncements, getGeneralAnnouncementDetails, getGeneralAnnouncements } from '@/utils/api/announcements';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { io, Socket } from 'socket.io-client';

// Define Socket.IO types
interface SocketAnnouncementEvent {
  announcement: any;
}

const socket: Socket = io(BASE_URL, {
  transports: ['websocket'],
  autoConnect: false,
});

export const useGetGeneralAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);

  const query = useInfiniteQuery({
    queryKey: ['generalAnnouncements'],
    queryFn: ({ pageParam }) =>
      getGeneralAnnouncements({ page: pageParam, limit: 10 }),
    initialPageParam: 1,
    // getNextPageParam: (lastPage) => {
    //   const nextPage = lastPage.page + 1;
    //   return nextPage <= Math.ceil(lastPage.total / lastPage.limit) ? nextPage : undefined;
    // },
    getNextPageParam: (lastPage, allPages) => {
  return lastPage.length < 10 ? undefined : allPages.length + 1;
}

  });

  useEffect(() => {
    socket.connect();
    socket.emit('joinRoom', 'generalAnnouncements');

    socket.on('newAnnouncement', (data: SocketAnnouncementEvent) => {
      console.log('data', data);
      setAnnouncements((prev) => [data, ...prev]);
    });

    socket.on('updateAnnouncement', (data: SocketAnnouncementEvent) => {
      setAnnouncements((prev) =>
        prev.map((ann) =>
          ann.announcement_id === data.announcement.announcement_id ? data.announcement : ann
        )
      );
    });

    socket.on('deleteAnnouncement', (data: { announcement_id: number }) => {
      setAnnouncements((prev) =>
        prev.filter((ann) => ann.announcement_id !== data.announcement_id)
      );
    });

    return () => {
      socket.emit('leaveRoom', 'generalAnnouncements');
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // if (query.data) {
    //   setAnnouncements(
    //     query.data.pages.flatMap((page) => page.announcements)
    //   );
    // }
    if (query.data) {
  setAnnouncements(query.data.pages.flat());
}

  }, [query.data]);

  return { ...query, announcements };
};

export const useGetCourseAnnouncements = (courseId: number) => {
  const [announcements, setAnnouncements] = useState([]);

  const query = useInfiniteQuery({
    queryKey: ['courseAnnouncements', courseId],
    queryFn: ({ pageParam }) =>
      getCourseAnnouncements({ courseId, page: pageParam, limit: 10 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      return nextPage <= Math.ceil(lastPage.total / lastPage.limit) ? nextPage : undefined;
    },
    enabled: !!courseId,
  });

  useEffect(() => {
    socket.connect();
    socket.emit('joinRoom', `course_${courseId}`);

    socket.on('newAnnouncement', (data: SocketAnnouncementEvent) => {
      setAnnouncements((prev) => [data.announcement, ...prev]);
      Toast.show({
        type: 'success',
        text1: 'New Course Announcement',
        text2: data.announcement.title,
      });
    });

    socket.on('updateAnnouncement', (data: SocketAnnouncementEvent) => {
      setAnnouncements((prev) =>
        prev.map((ann) =>
          ann.announcement_id === data.announcement.announcement_id ? data.announcement : ann
        )
      );
    });

    socket.on('deleteAnnouncement', (data: { announcement_id: number }) => {
      setAnnouncements((prev) =>
        prev.filter((ann) => ann.announcement_id !== data.announcement_id)
      );
    });

    return () => {
      socket.emit('leaveRoom', `course_${courseId}`);
      socket.disconnect();
    };
  }, [courseId]);

  useEffect(() => {
    if (query.data) {
      setAnnouncements(
        query.data.pages.flatMap((page) => page.announcements)
      );
    }
  }, [query.data]);

  return { ...query, announcements };
};


export const useCourseGetAnnouncementDetails = (announcementId: number) => {
  const [announcement, setAnnouncement] = useState(null);
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['general-announcement', announcementId],
    queryFn: () => getCourseAnnouncementDetails(announcementId),
    enabled: !!announcementId,
  });

  useEffect(() => {
    socket.connect();
    socket.emit('joinRoom', `announcement_${announcementId}`);

    socket.on('updateAnnouncement', (data: SocketAnnouncementEvent) => {
      setAnnouncement(data.announcement);
      Toast.show({
        type: 'info',
        text1: 'Announcement Updated',
        text2: data.announcement.title,
      });
    });

    socket.on('deleteAnnouncement', (data: { announcement_id: number }) => {
      if (data.announcement_id === announcementId) {
        queryClient.invalidateQueries({ queryKey: ['announcement', announcementId] });
        Toast.show({
          type: 'info',
          text1: 'Announcement Deleted',
        });
      }
    });

    return () => {
      socket.emit('leaveRoom', `announcement_${announcementId}`);
      socket.disconnect();
    };
  }, [announcementId, queryClient]);

  useEffect(() => {
    if (query.data) {
      setAnnouncement(query.data);
    }
  }, [query.data]);

  return { ...query, announcement };
};


export const useGeneralGetAnnouncementDetails = (announcementId: number) => {
  const [announcement, setAnnouncement] = useState(null);
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['course-announcement', announcementId],
    queryFn: () => getGeneralAnnouncementDetails(announcementId),
    enabled: !!announcementId,
  });

  useEffect(() => {
    socket.connect();
    socket.emit('joinRoom', `announcement_${announcementId}`);

    socket.on('updateAnnouncement', (data: SocketAnnouncementEvent) => {
      setAnnouncement(data.announcement);
      Toast.show({
        type: 'info',
        text1: 'Announcement Updated',
        text2: data.announcement.title,
      });
    });

    socket.on('deleteAnnouncement', (data: { announcement_id: number }) => {
      if (data.announcement_id === announcementId) {
        queryClient.invalidateQueries({ queryKey: ['announcement', announcementId] });
        Toast.show({
          type: 'info',
          text1: 'Announcement Deleted',
        });
      }
    });

    return () => {
      socket.emit('leaveRoom', `announcement_${announcementId}`);
      socket.disconnect();
    };
  }, [announcementId, queryClient]);

  useEffect(() => {
    if (query.data) {
      setAnnouncement(query.data);
    }
  }, [query.data]);

  return { ...query, announcement };
};