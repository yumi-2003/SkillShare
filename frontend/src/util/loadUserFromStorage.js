import { setUser } from '../stores/slices/userSlice';

// Function to load user data from localStorage and dispatch to Redux store
export const loadUserFromStorage = (dispatch) => {
  try {
    const storedUser = localStorage.getItem('SkillShareUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch(setUser(user));
    }
  } catch (error) {
    console.error('Failed to load user from localStorage:', error);
  }
};