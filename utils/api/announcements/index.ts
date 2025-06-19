import api from "@/constants/appBaseUrl";

// Define types
interface Admin {
  user_id: number;
  user: {
    user_id: number;
    name: string;
    email: string;
    role: 'Admin' | 'SuperAdmin';
  };
}

interface Teacher {
  user_id: number;
  user: {
    user_id: number;
    name: string;
    email: string;
    role: 'Teacher';
  };
}

interface PollOption {
  option_id: number;
  text: string;
  votes: number;
}

interface Poll {
  poll_id: number;
  allow_multiple_answers: boolean;
  options: PollOption[];
}

interface Attachment {
  attachment_id: number;
  url: string;
  filename: string;
}

export interface Announcement {
  announcement_id: number;
  title: string;
  content: string;
  created_at: string;
  course_id?: number;
  admin?: Admin;
  teacher?: Teacher;
  Polls: Poll[];
  Attachments: Attachment[];
}

export interface PaginatedAnnouncements {
  announcements: Announcement[];
  total: number;
  page: number;
  limit: number;
}

interface FetchAnnouncementsParams {
  page?: number;
  limit?: number;
  courseId?: number;
}

// Fetch general announcements
export const getGeneralAnnouncements = async ({
  page = 1,
  limit = 10,
}: FetchAnnouncementsParams): Promise<PaginatedAnnouncements> => {
  try {
    const response = await api.get('/announcements/general', {
      params: { page, limit },
    });
    // console.log('response.data', response.data)
    return response.data;

    // return {
    //   page,
    //   limit,
    //   total: response.data.length, // or from header if available
    //   announcements: response.data,
    // };
  } catch (error: any) {
    console.error('Failed to fetch general announcements:', error);
    throw error;
  }
};

// Fetch course announcements
export const getCourseAnnouncements = async ({
  courseId,
  page = 1,
  limit = 10,
}: FetchAnnouncementsParams): Promise<PaginatedAnnouncements> => {
  try {
    const response = await api.get('/announcements/course', {
      params: { courseId, page, limit },
    });
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch course announcements:', error);
    throw error;
  }
};

export const getCourseAnnouncementDetails = async (announcementId: number): Promise<Announcement> => {
  try {
    const response = await api.get(`/announcements/course/${announcementId}`);
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch announcement details:', error);
    throw error;
  }
};

export const getGeneralAnnouncementDetails = async (announcementId: number): Promise<Announcement> => {
  try {
    const response = await api.get(`/announcements/general/${announcementId}`);
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch announcement details:', error);
    throw error;
  }
};
