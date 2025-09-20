// axios-interceptors.js

import axios from "axios";

// Create a Axios instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  //   timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// =================================================================
// REQUEST INTERCEPTOR
// =================================================================
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log the request for debugging purposes
    console.log(
      `[Request Interceptor] Sending a ${
        config.method?.toUpperCase() ?? "UNKNOWN"
      } request to ${config.url}`
    );

    return config;
  },
  (error) => {
    // Do something with request error
    console.error("[Request Interceptor] Request error:", error);
    return Promise.reject(error);
  }
);

// =================================================================
// RESPONSE INTERCEPTOR
// =================================================================
apiClient.interceptors.response.use(
  (response) => {
    // Log successful responses
    console.log(
      `[Response Interceptor] Received a ${response.status} response from ${response.config.url}`
    );

    // Return the response object to the calling function
    return response;
  },
  async (error) => {
    // Handle specific status codes or error types
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(
        `[Response Interceptor] Received a ${error.response.status} error:`,
        error.response.data
      );

      switch (error.response.status) {
        case 401:
          // Handle 401 Unauthorized errors
          // e.g., redirect to login page or attempt to refresh the token
          console.log("401 Unauthorized: Redirecting to login page...");
          // window.location.href = '/login'; // Or use a router like useRouter in Next.js
          break;
        case 403:
          // Handle 403 Forbidden errors
          console.error(
            "403 Forbidden: You do not have permission to access this resource."
          );
          break;
        case 500:
          // Handle 500 Server errors
          console.error("500 Internal Server Error: Please try again later.");
          break;
        default:
          // Handle other status codes
          break;
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error(
        "[Response Interceptor] No response received:",
        error.request
      );
    } else {
      // Something happened in setting up the request that triggered an error
      console.error(
        "[Response Interceptor] Error in request setup:",
        error.message
      );
    }

    return Promise.reject(error);
  }
);

// Export the custom apiClient for use throughout your application
export default apiClient;
