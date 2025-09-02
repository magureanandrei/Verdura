import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
    return (
        <>
            <h1>Dashboard</h1>
            <p>This is the dashboard page.</p>
            <button onClick={()=>navigate("/history")}>Go to History</button>
            <br />
            <button onClick={()=>navigate("/settings")}>Go to Settings</button>
            </>
    )
}