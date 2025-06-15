import { api } from "@/constants/appBaseUrl";

export const getStudentDetails = async () => {
  try {
    const response = await api.get('/student/details');
    return response.data;
  } catch (error) {
    console.error('Error fetching student details:', error);
    throw error;
  }
};

export const updateStudentDetails = async (name, phone_number) => {
  try {
    const response = await api.put('/student/details', { name, phone_number });
    return response.data;
  } catch (error) {
    console.error('Error updating student details:', error);
    throw error;
  }
};

export const getStudentCourses = async () => {
  try {
    const response = await api.get('/student/courses');
    return response.data;
  } catch (error) {
    console.error('Error fetching student courses:', error);
    throw error;
  }
};

export const getStudentDeadlines = async () => {
  try {
    const response = await api.get('/student/deadlines');
    return response.data;
  } catch (error) {
    console.error('Error fetching student deadlines:', error);
    throw error;
  }
};

export const joinCourse = async (courseId) => {
  try {
    const response = await api.post('/student/courses/join', { courseId });
    return response.data;
  } catch (error) {
    console.error('Error joining course:', error);
    throw error;
  }
};

export const getGeneralAnnouncements = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/announcements/general?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching general announcements:', error);
    throw error;
  }
};

export const getCourseAnnouncements = async (courseId, page = 1, limit = 10) => {
  try {
    const response = await api.get(`/announcements/course?courseId=${courseId}&page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching course announcements:', error);
    throw error;
  }
};