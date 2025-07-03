import { BASE_URL, student_role } from "@/constants";
import { Assignment, roleType, Student } from "@/types";
import {
  getStudentCourses,
  getStudentDeadlines,
  getStudentDetails,
  getUpcomingDeadlines,
  joinCourse,
} from "@/utils/api/student";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { io } from "socket.io-client";

interface Course {
  course_id: number;
  title: string;
  Teachers: {
    user_id: number;
    name: string;
    user: {
      user_id: number;
      name: string;
      email: string;
      role: "Teacher";
    };
  }[];
}

interface SocketAssignmentEvent {
  assignment: Assignment;
}

const socket = io(BASE_URL, {
  transports: ['websocket'],
  autoConnect: false,
});


// Hook to fetch student details
export const useGetStudentDetails = () => {
  return useQuery<Student, Error>({
    queryKey: ["studentDetails"],
    queryFn: getStudentDetails,
  });
};

// Fetch student's enrolled courses
export const useGetStudentCourses = (role: roleType) => {
  return useQuery<Course[], Error>({
    queryKey: ["studentCourses"],
    queryFn: getStudentCourses,
    enabled: !!role && role === student_role
  });
};

// Fetch upcoming assignment deadlines
export const useGetStudentDeadlines = (role: roleType) => {
  return useQuery({
    queryKey: ["studentDeadlines"],
    queryFn: getStudentDeadlines,
  });
};

export const useGetDeadlines = (studentId: number) => {
  console.log(studentId)
  return useQuery({
    queryKey: ['upcomingDeadlines', studentId],
    queryFn: () => getUpcomingDeadlines(studentId),
    enabled: !!studentId, // Only fetch if studentId is valid
  });
};


// Join a course
export const useJoinCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (joinCode: string) => joinCourse(joinCode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentCourses"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
