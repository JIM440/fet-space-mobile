import { BASE_URL } from '@/constants';
import { useAuth } from '@/hooks/useAuth';
import { Announcement, Assignment, Notification, User } from '@/types';
import { getNotifications } from '@/utils/api/notifications';
import { getStudentCourses } from '@/utils/api/student';
import { getTeacherCourses } from '@/utils/api/teacher';
import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { io, Socket } from 'socket.io-client';

interface SocketEvent {
  assignment?: Assignment;
  announcement?: Announcement;
}


interface NotificationsQueryResult {
  notifications: Notification[];
}

const socket: Socket = io(BASE_URL, {
  transports: ['websocket'],
  autoConnect: false,
});

export const useGetNotifications = (
  options?: Omit<UseQueryOptions<NotificationsQueryResult, Error, any, ['notifications']>, 'queryKey' | 'queryFn'>
) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const query = useQuery<NotificationsQueryResult, Error>({
    queryKey: ['notifications'],
    queryFn: async () => {
      const notifications = await getNotifications(user as User);
      return { notifications };
    },
    enabled: !!user,
    onError: (error: Error) => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'Failed to load notifications',
      });
    },
    ...options,
  });

  useEffect(() => {
    if (!user) return;

    socket.connect();
    socket.emit('joinRoom', 'generalAnnouncements');

    const fetchCourses = user.role === 'Student' ? getStudentCourses : user.role === 'Teacher' ? getTeacherCourses : null;
    if (fetchCourses) {
      fetchCourses().then((courses) => {
        courses.forEach((course: any) => {
          socket.emit('joinRoom', `course_${course.course_id}`);
        });
      });
    }

    socket.on('newAssignment', (data: SocketEvent) => {
      if (data.assignment && user.role === 'Student') {
        const newNotification: Notification = {
          id: `assignment_${data.assignment.id}`,
          image: data.assignment.imageUri || 'https://example.com/notification_icon.png',
          type: 'New Assignment',
          time: formatTimeAgo(data.assignment.dueDate),
          description: `${data.assignment.courseCode} - ${data.assignment.title}`,
          read: false,
          code: data.assignment.courseCode,
        };
        setNotifications((prev) => [newNotification, ...prev]);
        Toast.show({
          type: 'success',
          text1: 'New Assignment',
          text2: data.assignment.title,
        });
      }
    });

    socket.on('newAnnouncement', (data: SocketEvent) => {
      if (data.announcement) {
        const isGeneral = !data.announcement.course_id;
        if (isGeneral || user.role === 'Student' || user.role === 'Teacher') {
          const newNotification: Notification = {
            id: `${isGeneral ? 'general' : 'course'}_${data.announcement.announcement_id}`,
            image: (isGeneral ? data.announcement.admin?.user.image : data.announcement.teacher?.user.image) || 'https://example.com/notification_icon.png',
            type: isGeneral ? 'General Announcement' : 'Course Announcement',
            time: formatTimeAgo(data.announcement.created_at),
            description: `${isGeneral ? 'General' : `Course ${data.announcement.course_id || 'Unknown'}`} - ${data.announcement.title}`,
            read: false,
            code: isGeneral ? 'General' : `Course ${data.announcement.course_id || 'Unknown'}`,
          };
          setNotifications((prev) => [newNotification, ...prev]);
          Toast.show({
            type: 'success',
            text1: isGeneral ? 'General Announcement' : 'Course Announcement',
            text2: data.announcement.title,
          });
        }
      }
    });

    return () => {
      socket.emit('leaveRoom', 'generalAnnouncements');
      socket.off('newAssignment');
      socket.off('newAnnouncement');
      socket.disconnect();
    };
  }, [queryClient, user]);

  useEffect(() => {
    if (query.data?.notifications) {
      setNotifications(query.data.notifications);
    }
  }, [query.data]);

  return { ...query, notifications };
};

const formatTimeAgo = (date: string): string => {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}min`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d`;
  return `${Math.floor(diffDays / 7)}w`;
};