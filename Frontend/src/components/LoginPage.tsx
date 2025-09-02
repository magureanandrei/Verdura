import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    return (
        <>
            <h1>Login Page</h1>
            <br />
            <form onSubmit={e => { e.preventDefault(); console.log("Login submitted"); navigate("/dashboard"); }}>
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