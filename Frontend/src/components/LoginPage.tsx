import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { LoginRequest } from "../interfaces/LoginRequest";

export default function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const loginRequest: LoginRequest = {
            username: formData.get('username') as string,
            password: formData.get('password') as string
        };
        try {
            const response = await axios.post('http://localhost:8080/auth/login', loginRequest);
            if (response.status === 200) {
                const { token, user } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('userId', user.userId);
                //console.log("Login successful");
                //console.log(token);
                //console.log(user.userId);
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Login failed", error);
        }   
    }
    return (
        <>
            <h1>Login Page</h1>
            <br />
            <form onSubmit={handleLogin}>
                <label>Username:</label>
                <input type="text" name="username" />
                <br />
                <label>Password:</label>
                <input type="password" name="password" />
                <br />
                <button type="submit">Login</button>
            </form>
        </>
    )
}