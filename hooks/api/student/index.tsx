import { BASE_URL, student_role } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import { Assignment, roleType, Student } from "@/types";
import {
  getDeadlines,
  getStudentCourses,
  getStudentDeadlines,
  getStudentDetails,
  joinCourse,
} from "@/utils/api/student";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
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


export const useGetDeadlines = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [deadlines, setDeadlines] = useState<Assignment[]>([]);

  const query = useQuery({
    queryKey: ['deadlines'],
    queryFn: getDeadlines,
    enabled: user?.role === 'Student',
  });

  useEffect(() => {
    if (user?.role !== 'Student') return;

    socket.connect();

    getStudentCourses().then((courses) => {
      courses.forEach((course: any) => {
        socket.emit('joinRoom', `course_${course.course_id}`);
      });
    });

    socket.on('newAssignment', (data: SocketAssignmentEvent) => {
      setDeadlines((prev) => [...prev, data.assignment]);
    });

    socket.on('updateAssignment', (data: SocketAssignmentEvent) => {
      setDeadlines((prev) =>
        prev.map((ass) => (ass.id === data.assignment.id ? data.assignment : ass))
      );
    });

    socket.on('deleteAssignment', (data: { assignment_id: number }) => {
      setDeadlines((prev) => prev.filter((ass) => ass.id !== data.assignment_id));
    });

    return () => {
      socket.off('newAssignment');
      socket.off('updateAssignment');
      socket.off('deleteAssignment');
      socket.disconnect();
    };
  }, [queryClient, user]);

  useEffect(() => {
    if (query.data) {
      setDeadlines(query.data);
    }
  }, [query.data]);

  return { ...query, deadlines };
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
