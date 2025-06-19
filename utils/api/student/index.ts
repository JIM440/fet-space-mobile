import { api } from "@/constants/appBaseUrl";
import { Assignment } from "@/types";

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

export const joinCourse = async (joinCode: string) => {
  try {
    const response = await api.post('/student/courses/join', { joinCode });
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


export const getDeadlines = async (): Promise<Assignment[]> => {
  try {
    const [deadlinesResponse, coursesResponse] = await Promise.all([
      api.get('/student/deadlines'),
      api.get('/student/courses'),
    ]);

    const courseMap = new Map<number, any>();
    coursesResponse.data.forEach((course: any) => {
      courseMap.set(course.course_id, course);
    });

    return deadlinesResponse.data.map((item: any) => {
      const course = courseMap.get(item.course_id);
      return {
        id: item.assignment_id,
        title: item.title,
        courseCode: course?.courseCode || `Course_${item.course_id}`,
        dueDate: item.due_date,
        description: item.description || `Assignment for ${course?.title || 'Unknown'}`,
        course_id: item.course_id,
        imageUri: 'https://via.placeholder.com/80',
      };
    });
  } catch (error: any) {
    console.error('Failed to fetch deadlines:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch deadlines');
  }
};
