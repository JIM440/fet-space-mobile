import { teacher_role } from '@/constants';
import { roleType } from '@/types';
import { getTeacherCourses } from '@/utils/api/teacher';
import { useQuery } from '@tanstack/react-query';

export const useGetTeacherCourses = (role: roleType) => {
  return useQuery({
    queryKey: ['teacherCourses'],
    queryFn: getTeacherCourses,
            enabled: !!role && role === teacher_role
  });
};