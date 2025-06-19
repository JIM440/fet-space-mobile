import { getCourseDetails } from '@/utils/api/courses';
import { useQuery } from '@tanstack/react-query';

export const useGetCourseDetails = (courseId: number) => {
  return useQuery({
    queryKey: ['courseDetails', courseId],
    queryFn: () => getCourseDetails(courseId),
    enabled: !!courseId,
  });
};