import axios from "axios";

export async function validateEmail(email: string): Promise<string | null> {
  if (!email || email.trim().length === 0) {
    return "Email is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }

  try {
    const response = await axios.post("http://localhost:8080/auth/check-email", {
      email: email
    });

    const exists = response.data; 

    if (exists) {
      return "Email already in use";
    }
  } catch (error) {
    console.error("Error checking email:", error);
    return "Could not validate email. Please try again.";
  }

  return null;
}
