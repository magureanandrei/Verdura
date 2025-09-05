import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { LoginRequest } from "../interfaces/LoginRequest";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        
        if (!username.trim() || !password.trim()) {
            toast.error("Username and password are required");
            return;
        }

        const loginRequest: LoginRequest = { username, password };

        try {
            const response = await axios.post("http://localhost:8080/auth/login", loginRequest);
            if (response.status === 200) {
                const { token, user } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("userId", user.userId);
                toast.success(`Welcome back, ${user.username}!`);
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Login failed", error);
            toast.error("Invalid username or password");
        }
    };

    return (
        <>
            <h1>Login Page</h1>
            <form onSubmit={handleLogin}>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button type="submit">Login</button>
            </form>
        </>
    );
}
