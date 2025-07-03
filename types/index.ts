// Define types for student details
export interface User {
  user_id: number;
  name: string;
  email: string;
  role: "Student";
  matricule_number?: string;
  nationality?: string;
  level?: string;
  institutional_email?: string;
}

export interface Student {
  user_id: number;
  name: string;
  email: string;
  role: "Student";
  student :{
    matricule_number?: string;
    nationality?: string;
    level?: string;
    institutional_email?: string;
  }
}

export interface roleType {
  role: string | null
}

// announcement
// user
// files
export interface fileProps {
  id?: string | number;
  name?: string;
  date?: string;
  size: string;
  pages?: string | number;
  type: "pdf" | "docx" | "img" | "ppt" | "video"; // Expanded to include video
  url: string; // For download/viewing
}

// assignments
export interface assignmentProps {
  id?: string | number;
  title: string;
  description: string;
  date: string;
}

export interface Assignment {
  id: number;
  title: string;
  courseCode: string;
  dueDate: string;
  description: string;
  imageUri?: string;
  course_id: number;
}

export interface Notification {
  id: string;
  image: string;
  type: 'General Announcement' | 'New Assignment' | 'Course Announcement';
  time: string;
  description: string;
  read: boolean;
  code: string;
}
// users
export interface userProps {
  id?: string | number;
  name: string;
  matricule?: string;
  imageUri: string;
}
// regular announcement
export interface RegularAnnouncementProps {
  id?: string | number;
  title: string;
  content: string;
  date: string;
  type?: "poll" | "regular";
  announcementType: "course" | "general" | string;
  comments?: number;
  author: { name: string; image: string };
}

// types/index.ts
export interface Comment {
  comment_id: number; // Maps to comment_id
  content: string; // Maps to content
  user: {
    user_id: number;
    name: string; // Maps to user.name
    image?: string; // Optional, as it's not in the provided data
    email?: string; // Optional, from user.email
    phone_number?: string; // Optional, from user.phone_number
  };
  created_at: string; // Maps to created_at
  user_id: number; // Maps to user_id
  general_announcement_id?: number; // Optional, from general_announcement_id
  course_announcement_id?: number; // Optional, from course_announcement_id
  assignment_id?: number; // Optional, from assignment_id
}


export interface courseProps {
  id: number;
  courseCode: string;
  title: string;
  description?: string;
  created_at: string;
  student_count: number;
}

export interface Announcement {
  announcement_id: number;
  title: string;
  content: string;
  created_at: string;
  course_id?: number;
  admin?: {
    user_id: number;
    user: { user_id: number; name: string; email: string; role: 'Admin' | 'SuperAdmin' };
  };
  teacher?: {
    user_id: number;
    user: { user_id: number; name: string; email: string; role: 'Teacher' };
  };
  Polls: {
    poll_id: number;
    allow_multiple_answers: boolean;
    options: { option_id: number; text: string; votes: number }[];
  }[];
  Attachments: { attachment_id: number; url: string; filename: string }[];
}