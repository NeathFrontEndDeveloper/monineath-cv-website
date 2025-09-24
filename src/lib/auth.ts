import Cookies from "js-cookie";

export const Logout = () => {
  Cookies.remove("token"); // remove auth token cookie
  window.location.href = "/login"; // redirect to login page
};
