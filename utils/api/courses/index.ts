// utils/api/courses.js
import { api } from '@/constants/appBaseUrl';

export const getCourseDetails = async (courseId: number): Promise<any> => {
  try {
    const response = await api.get(`/courses/${courseId}`);
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch course details:', error);
    throw error;
  }
};

export const getCoursePersons = async (courseId: number): Promise<any> => {
  try {
    const response = await api.get(`/courses/${courseId}/persons`);
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch course persons:', error);
    throw error;
  }
};

export const getCourseContents = async (courseId: number): Promise<any> => {
  try {
    const response = await api.get(`/courses/${courseId}/contents`);
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch course contents:', error);
    throw error;
  }
};

export const getCourseAssignments = async (courseId: number): Promise<any> => {
  try {
    const response = await api.get(`/courses/${courseId}/assignments`);
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch course assignments:', error);
    throw error;
  }
};

export const getCourseRevisionQuestions = async (courseId: number): Promise<any> => {
  try {
    const response = await api.get(`/courses/${courseId}/revision-questions`);
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch course revision questions:', error);
    throw error;
  }
};