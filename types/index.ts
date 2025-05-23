// course
export interface courseProps {
  id: string | number;
  courseCode: string;
  title: string;
  description: string;
  semester: string;
  academicYear: string;
  instructor: string;
}
// announcement
// user
// files
export interface fileProps {
  id?: string | number;
  name: string;
  type: "pdf" | "docx" | "ppt" | "img" | string;
  date?: string;
  size: string;
  pages: string | number;
}
// assignments
export interface assignmentProps {
  id?: string | number;
  title: string;
  description: string;
  date: string;
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
  type?: 'poll' | 'regular';
  announcementType: 'course' | 'general' | string;
  comments?: number;
  author: { name: string; image: string };
}

export interface Comment {
  id: number;
  text: string;
  author: string;
  timestamp: string;
}