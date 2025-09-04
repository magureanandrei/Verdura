import { useNavigate } from "react-router-dom";
import type { RegisterRequest } from "../interfaces/RegisterRequest";
import axios from "axios";
import { toast  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateUsername } from "../utilities/UsernameValidation";
import { validateEmail } from "../utilities/EmailValidation";
import { validatePassword } from "../utilities/PasswordValidation";
import { validatePasswordMatch } from "../utilities/PasswordMatchValidation";
import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const usernameError = await validateUsername(username);
      if (usernameError) return toast.error(usernameError);

      const emailError = await validateEmail(email);
      if (emailError) return toast.error(emailError);

      const passwordError = validatePassword(password);
      if (passwordError) return toast.error(passwordError);

      const passwordMatchError = validatePasswordMatch(
        password,
        confirmPassword
      );
      if (passwordMatchError) return toast.error(passwordMatchError);

      const registerData: RegisterRequest = {
        username,
        email,
        password,
      };

      const response = await axios.post<RegisterRequest>("http://localhost:8080/auth/register", registerData);

      if (response.status === 201 || response.status === 200) {
        toast.success("Account created successfully!");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("Registration failed. Please try again.");
    }
  };
  return (
    <div className="register-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
