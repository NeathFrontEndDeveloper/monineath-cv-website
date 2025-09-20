export const Logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/home";
};
