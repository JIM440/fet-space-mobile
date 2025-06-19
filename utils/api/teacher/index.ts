import { api } from "@/constants/appBaseUrl";

export const createCourse = async (data: { title: string; subtitle: string }) => {
  try {
    const response = await api.post('/teacher/courses', data);
    return response.data;
  } catch (error: any) {
    console.error('Failed to create course:', error);
    throw new Error(error.response?.data?.message || 'Failed to create course');
  }
};

export const addStudentToCourse = async (data: { courseId: number; studentId: number }) => {
  try {
    const response = await api.post('/teacher/courses/students', data);
    return response.data;
  } catch (error: any) {
    console.error('Failed to add student to course:', error);
    throw new Error(error.response?.data?.message || 'Failed to add student to course');
  }
};

export const removeStudentFromCourse = async (data: { courseId: number; studentId: number }) => {
  try {
    const response = await api.delete('/teacher/courses/students', { data });
    return response.data;
  } catch (error: any) {
    console.error('Failed to remove student from course:', error);
    throw new Error(error.response?.data?.message || 'Failed to remove student from course');
  }
};

export const getTeacherCourses = async () => {
  try {
    const response = await api.get('/teacher/courses/mine');
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch teacher courses:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch teacher courses');
  }
};