import { useNavigate } from "react-router-dom";
import type { RegisterRequest } from "../interfaces/RegisterRequest";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateUsername, validateEmail, validatePassword, validatePasswordMatch } from "../utilities/validation";

export default function RegisterPage() {
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const username = formData.get('username') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;
        
        // Validate all fields
        const usernameValidation = validateUsername(username);
        if (!usernameValidation.isValid) {
            toast.error(usernameValidation.message);
            return;
        }

        const emailValidation = validateEmail(email);
        if (!emailValidation.isValid) {
            toast.error(emailValidation.message);
            return;
        }

        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) {
            toast.error(passwordValidation.message);
            return;
        }

        const passwordMatchValidation = validatePasswordMatch(password, confirmPassword);
        if (!passwordMatchValidation.isValid) {
            toast.error(passwordMatchValidation.message);
            return;
        }

        const registerRequest: RegisterRequest = {
            username,
            email,
            password
        };

        try {
            const response = await axios.post('http://localhost:8080/auth/register', registerRequest);
            if (response.status === 200) {
                const { token, user } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('userId', user.id);
                toast.success("Registration successful!");
                navigate("/dashboard");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data || "Registration failed");
            } else {
                toast.error("An unexpected error occurred");
            }
            console.error("Register failed:", error);
        }   
    }

    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} />
            <h1>Register Page</h1>
            <br />
            <form onSubmit={handleRegister}>
                <label>Username:</label>
                <input type="text" name="username" required minLength={3} />
                <br />
                <label>Email:</label>
                <input type="email" name="email" required />
                <br />
                <label>Password:</label>
                <input 
                    type="password" 
                    name="password" 
                    required 
                    minLength={8} 
                    pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?:{}|<>]).{8,}$"
                    title="Must contain at least 8 characters, including uppercase and lowercase letters, numbers, and special characters"
                />
                <br />
                <label>Confirm Password:</label>
                <input type="password" name="confirmPassword" required />
                <br />
                <button type="submit">Register</button>
            </form>
        </>
    )
}