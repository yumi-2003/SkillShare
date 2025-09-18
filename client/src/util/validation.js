export const emailValidate = (email) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return emailPattern.test(email);
};
export const passwordValidate = (password) => {
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  return passwordPattern.test(password);
};
