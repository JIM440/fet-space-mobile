// hooks/api/courses.js
import {
  getCourseAssignments,
  getCourseContents,
  getCourseDetails,
  getCoursePersons,
  getCourseRevisionQuestions,
} from '@/utils/api/courses';
import { useQuery } from '@tanstack/react-query';

export const useGetCourseDetails = (courseId: number) => {
  return useQuery({
    queryKey: ['courseDetails', courseId],
    queryFn: () => getCourseDetails(courseId),
    enabled: !!courseId,
  });
};

export const useGetCoursePersons = (courseId: number) => {
  return useQuery({
    queryKey: ['coursePersons', courseId],
    queryFn: () => getCoursePersons(courseId),
    enabled: !!courseId,
  });
};

export const useGetCourseContents = (courseId: number) => {
  return useQuery({
    queryKey: ['courseContents', courseId],
    queryFn: () => getCourseContents(courseId),
    enabled: !!courseId,
  });
};

export const useGetCourseAssignments = (courseId: number) => {
  return useQuery({
    queryKey: ['courseAssignments', courseId],
    queryFn: () => getCourseAssignments(courseId),
    enabled: !!courseId,
  });
};

export const useGetCourseRevisionQuestions = (courseId: number) => {
  return useQuery({
    queryKey: ['courseRevisionQuestions', courseId],
    queryFn: () => getCourseRevisionQuestions(courseId),
    enabled: !!courseId,
  });
};