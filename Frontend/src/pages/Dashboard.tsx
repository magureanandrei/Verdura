import { useNavigate } from "react-router-dom";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

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

            <CountdownCircleTimer
            isPlaying
            duration={7}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            >
            {({ remainingTime }: { remainingTime: number }) => remainingTime}
            </CountdownCircleTimer>
        </>
    )
}