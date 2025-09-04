import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate("/");
        //console.log("Logged out");
        //console.log(localStorage.getItem('token'));
    }

    return (
        <>
            <h1>Dashboard</h1>
            <p>This is the dashboard page.</p>
            <button onClick={()=>navigate("/history")}>Go to History</button>
            <br />
            <button onClick={()=>navigate("/settings")}>Go to Settings</button>

            <br />
            {localStorage.getItem('token') && (
                <button onClick={handleLogout}>Logout</button>
            )}
            </>
    )
}