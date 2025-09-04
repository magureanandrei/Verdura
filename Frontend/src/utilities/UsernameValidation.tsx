import axios from "axios";

export async function validateUsername(username: string): Promise<string | null> {
  if (!username || username.trim().length === 0) {
    return "Username is required";
  }

  if (username.length < 3) {
    return "Username must be at least 3 characters long";
  }

  try {
    const response = await axios.post("http://localhost:8080/auth/check-username", {
      username: username
    });

    const exists = response.data; 

    if (exists) {
      return "Username already exists";
    }
  } catch (error) {
    console.error("Error checking username:", error);
    return "Could not validate username. Please try again.";
  }

  return null;
}