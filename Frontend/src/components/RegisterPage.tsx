import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const navigate = useNavigate();
    return (
        <>
            <h1>Register Page</h1>
            <br />
            <form onSubmit={e => { e.preventDefault(); console.log("Register submitted"); navigate("/login"); }}>
                <label>Username:</label>
                <input type="text" name="username" />
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