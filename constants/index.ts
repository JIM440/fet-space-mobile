// My laptop ip address
export const BASE_URL = "http://192.168.43.172:8989";
// when connected to starlink
// export const BASE_URL = 'http://192.168.1.30:8989';
// ip address is used because in mobile when you put localhost the app will try to connect to the localhost of the mobile device, not the computer running the backend server
export const ACCESS_TOKEN_KEY = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";
export const USER_KEY = "user";
export const teacher_role = "Teacher";
export const student_role = "Student";

// constants/pdfAssets.ts
export const pdfAssets = {
  "civil_engineering.pdf": require("@/assets/documents/computer_engineering.pdf"),
  "chemical_and_petroleum_engineering.pdf": require("@/assets/documents/computer_engineering.pdf"),
  "computer_engineering.pdf": require("@/assets/documents/computer_engineering.pdf"),
  "electrical_and_electronic_engineering.pdf": require("@/assets/documents/computer_engineering.pdf"),
  "mechanical_and_industrial_engineering.pdf": require("@/assets/documents/computer_engineering.pdf"),
};
