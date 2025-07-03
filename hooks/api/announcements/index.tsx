import { api } from "@/constants/appBaseUrl";
import { BASE_URL } from "@/constants/index";
import {
  getCourseAnnouncementDetails,
  getCourseAnnouncements,
  getGeneralAnnouncementDetails,
  getGeneralAnnouncements,
} from "@/utils/api/announcements";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { io, Socket } from "socket.io-client";

// Define Socket.IO types
interface SocketAnnouncementEvent {
  announcement: any; // Replace with a specific interface if the structure is known
}

const socket: Socket = io(BASE_URL, {
  transports: ["websocket"],
  autoConnect: false,
});

interface PollResponse {
  user_id: number;
  option_id: number;
  created_at: string;
}

interface UseGetPollResponsesOptions {
  pollId: number;
}

export const useGetPollResponses = ({ pollId }: UseGetPollResponsesOptions) => {
  return useQuery<PollResponse[], Error>({
    queryKey: ["pollResponses", pollId],
    queryFn: async () => {
      if (!pollId) {
        throw new Error("Invalid poll ID");
      }
      const response = await api.get(`/polls/${pollId}/responses`);
      return response.data;
    },
    enabled: !!pollId,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

export const useGetGeneralAnnouncements = () => {
  const queryClient = useQueryClient();

  const query = useInfiniteQuery({
    queryKey: ["generalAnnouncements"],
    queryFn: ({ pageParam = 1 }) =>
      getGeneralAnnouncements({ page: pageParam, limit: 10 }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < 10 ? undefined : allPages.length + 1;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    socket.connect();
    socket.emit("joinRoom", "generalAnnouncements");

    const handleNewAnnouncement = (data: SocketAnnouncementEvent) => {
      queryClient.setQueryData(["generalAnnouncements"], (oldData: any) => {
        if (!oldData) return { pages: [[data.announcement]], pageParams: [1] };
        return {
          ...oldData,
          pages: [
            [data.announcement, ...oldData.pages[0]],
            ...oldData.pages.slice(1),
          ],
          pageParams: oldData.pageParams,
        };
      });
    };

    const handleUpdateAnnouncement = (data: SocketAnnouncementEvent) => {
      queryClient.setQueryData(["generalAnnouncements"], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page) =>
            page.map((ann: any) =>
              ann.announcement_id === data.announcement.announcement_id
                ? data.announcement
                : ann
            )
          ),
        };
      });
    };

    const handleDeleteAnnouncement = (data: { announcement_id: number }) => {
      queryClient.setQueryData(["generalAnnouncements"], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page) =>
            page.filter(
              (ann: any) => ann.announcement_id !== data.announcement_id
            )
          ),
        };
      });
      queryClient.removeQueries(["generalAnnouncement", data.announcement_id]);
    };

    socket.on("newAnnouncement", handleNewAnnouncement);
    socket.on("updateAnnouncement", handleUpdateAnnouncement);
    socket.on("deleteAnnouncement", handleDeleteAnnouncement);

    return () => {
      socket.emit("leaveRoom", "generalAnnouncements");
      socket.off("newAnnouncement", handleNewAnnouncement);
      socket.off("updateAnnouncement", handleUpdateAnnouncement);
      socket.off("deleteAnnouncement", handleDeleteAnnouncement);
      socket.disconnect();
    };
  }, [queryClient]);

  return {
    ...query,
    announcements: query.data?.pages.flat() || [],
  };
};

export const useCourseAnnouncementDetails = (announcementId: number) => {
  return useQuery({
    queryKey: ["courseAnnouncement", announcementId],
    queryFn: () => getCourseAnnouncementDetails(announcementId),
    enabled: !!announcementId,
  });
};

export const useCourseAnnouncements = (
  courseId: number,
  limit: number = 10
) => {
  return useInfiniteQuery({
    queryKey: ["courseAnnouncements", courseId],
    queryFn: ({ pageParam = 1 }) =>
      getCourseAnnouncements(courseId, pageParam, limit),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
export const useCourseGetAnnouncementDetails = (announcementId: number) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["courseAnnouncement", announcementId],
    queryFn: () => getCourseAnnouncementDetails(announcementId),
    enabled: !!announcementId,
  });

  useEffect(() => {
    if (!announcementId) return;

    socket.connect();
    socket.emit("joinRoom", `announcement_${announcementId}`);

    const handleUpdateAnnouncement = (data: SocketAnnouncementEvent) => {
      queryClient.setQueryData(
        ["courseAnnouncement", announcementId],
        data.announcement
      );
      Toast.show({
        type: "info",
        text1: "Announcement Updated",
        text2: data.announcement.title,
      });
    };

    const handleDeleteAnnouncement = (data: { announcement_id: number }) => {
      if (data.announcement_id === announcementId) {
        queryClient.removeQueries(["courseAnnouncement", announcementId]);
        Toast.show({
          type: "info",
          text1: "Announcement Deleted",
        });
      }
    };

    socket.on("updateAnnouncement", handleUpdateAnnouncement);
    socket.on("deleteAnnouncement", handleDeleteAnnouncement);

    return () => {
      socket.emit("leaveRoom", `announcement_${announcementId}`);
      socket.off("updateAnnouncement", handleUpdateAnnouncement);
      socket.off("deleteAnnouncement", handleDeleteAnnouncement);
      socket.disconnect();
    };
  }, [announcementId, queryClient]);

  return {
    ...query,
    announcement: query.data,
  };
};

export const useGeneralGetAnnouncementDetails = (announcementId: number) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["generalAnnouncement", announcementId],
    queryFn: () => getGeneralAnnouncementDetails(announcementId),
    enabled: !!announcementId,
  });

  useEffect(() => {
    if (!announcementId) return;

    socket.connect();
    socket.emit("joinRoom", `announcement_${announcementId}`);

    const handleUpdateAnnouncement = (data: SocketAnnouncementEvent) => {
      queryClient.setQueryData(
        ["generalAnnouncement", announcementId],
        data.announcement
      );
      Toast.show({
        type: "info",
        text1: "Announcement Updated",
        text2: data.announcement.title,
      });
    };

    const handleDeleteAnnouncement = (data: { announcement_id: number }) => {
      if (data.announcement_id === announcementId) {
        queryClient.removeQueries(["generalAnnouncement", announcementId]);
        Toast.show({
          type: "info",
          text1: "Announcement Deleted",
        });
      }
    };

    socket.on("updateAnnouncement", handleUpdateAnnouncement);
    socket.on("deleteAnnouncement", handleDeleteAnnouncement);

    return () => {
      socket.emit("leaveRoom", `announcement_${announcementId}`);
      socket.off("updateAnnouncement", handleUpdateAnnouncement);
      socket.off("deleteAnnouncement", handleDeleteAnnouncement);
      socket.disconnect();
    };
  }, [announcementId, queryClient]);

  return {
    ...query,
    announcement: query.data,
  };
};

export const useAnnouncementSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.connect();

    // Generic event handlers for all announcement-related rooms
    const handleNewAnnouncement = (data: SocketAnnouncementEvent) => {
      const room = data.announcement.course_id
        ? `course_${data.announcement.course_id}`
        : "generalAnnouncements";
      queryClient.setQueryData(
        [
          room === "generalAnnouncements"
            ? "generalAnnouncements"
            : "courseAnnouncements",
          data.announcement.course_id || null,
        ],
        (oldData: any) => {
          if (!oldData)
            return { pages: [[data.announcement]], pageParams: [1] };
          return {
            ...oldData,
            pages: [
              [data.announcement, ...oldData.pages[0]],
              ...oldData.pages.slice(1),
            ],
            pageParams: oldData.pageParams,
          };
        }
      );
    };

    const handleUpdateAnnouncement = (data: SocketAnnouncementEvent) => {
      const room = data.announcement.course_id
        ? `course_${data.announcement.course_id}`
        : "generalAnnouncements";
      queryClient.setQueryData(
        [
          room === "generalAnnouncements"
            ? "generalAnnouncements"
            : "courseAnnouncements",
          data.announcement.course_id || null,
        ],
        (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) =>
              page.map((ann: any) =>
                ann.announcement_id === data.announcement.announcement_id
                  ? data.announcement
                  : ann
              )
            ),
          };
        }
      );
      queryClient.setQueryData(
        ["generalAnnouncement", data.announcement.announcement_id],
        data.announcement
      );
      queryClient.setQueryData(
        ["courseAnnouncement", data.announcement.announcement_id],
        data.announcement
      );
    };

    const handleDeleteAnnouncement = (data: { announcement_id: number }) => {
      queryClient.setQueryData(["generalAnnouncements"], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page) =>
            page.filter(
              (ann: any) => ann.announcement_id !== data.announcement_id
            )
          ),
        };
      });
      queryClient.setQueryData(
        ["courseAnnouncements", null],
        (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) =>
              page.filter(
                (ann: any) => ann.announcement_id !== data.announcement_id
              )
            ),
          };
        }
      );
      queryClient.removeQueries(["generalAnnouncement", data.announcement_id]);
      queryClient.removeQueries(["courseAnnouncement", data.announcement_id]);
    };

    socket.on("newAnnouncement", handleNewAnnouncement);
    socket.on("updateAnnouncement", handleUpdateAnnouncement);
    socket.on("deleteAnnouncement", handleDeleteAnnouncement);

    return () => {
      socket.off("newAnnouncement", handleNewAnnouncement);
      socket.off("updateAnnouncement", handleUpdateAnnouncement);
      socket.off("deleteAnnouncement", handleDeleteAnnouncement);
      socket.disconnect();
    };
  }, [queryClient]);
};
