export const handleError = ({ error, defaultMsg = "Something went Wrong" }) => {
  if (error.response) {
    throw new Error(error.response.data.message || defaultMsg);
  } else if (error.request) {
    throw new Error("No response from server. Please try again later");
  } else {
    throw new Error(error.message);
  }
};
