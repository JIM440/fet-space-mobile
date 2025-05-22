export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

export const validateMatricule = (matricule: string): boolean => {
  const matriculeRegex = /^fe\d{2}a\d{3}$/;
  return matriculeRegex.test(matricule);
};