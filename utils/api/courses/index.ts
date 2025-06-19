import { api } from '@/constants/appBaseUrl';
import { courseProps } from '@/types';

export const getCourseDetails = async (courseId: number): Promise<courseProps> => {
  try {
    const response = await api.get(`/courses/${courseId}`);
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch course details:', error);
    throw error;
  }
};