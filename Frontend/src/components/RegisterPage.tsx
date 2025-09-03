import { useNavigate } from "react-router-dom";
import type { RegisterRequest } from "../interfaces/RegisterRequest";
import axios from "axios";

export default function RegisterPage() {
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;
        
        if (password !== confirmPassword) {
            console.error("Passwords do not match");
            return;
        }

        const registerRequest: RegisterRequest = {
            username: formData.get('username') as string,
            email: formData.get('email') as string,
            password: password
        };
        try {
            const response = await axios.post('http://localhost:8080/auth/register', registerRequest);
            if (response.status === 200) {
                const { token, user } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('userId', user.userId);
                // console.log('Token:', token);
                // console.log('User ID:', user.userId);
                // console.log("Registration successful");
                navigate("/dashboard");
            }
        }catch (error) {
            console.error("Register failed", error);
        }   
    }

    return (
        <>
            <h1>Register Page</h1>
            <br />
            <form onSubmit={handleRegister}>
                <label>Username:</label>
                <input type="text" name="username" />
                <br />
                <label>Email:</label>
                <input type="email" name="email" />
                <br />
                <label>Password:</label>
                <input type="password" name="password" />
                <br />
                <label>Confirm Password:</label>
                <input type="password" name="confirmPassword" />
                <br />
                <button type="submit">Register</button>
            </form>
        </>
    )
}