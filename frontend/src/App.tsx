import { useState, useEffect, useRef } from "react";
import "./App.css";
import { BACKEND_URL } from "./config";
import { UsernameSetup } from "./components/UsernameSetup";

interface UserData {
  username?: string;
  score?: number;
  profileURL?: string;
}

function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return; // skip if already called
    hasInitialized.current = true; // mark as called

    fetch(`${BACKEND_URL}/users/init`, {
      method: "POST",
      credentials: "include", // include cookies
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json()) // parse the response body as json
      .then((data) => {
        setUserData(data); // set user data with the response
        setLoading(false); // set loading false
      })
      .catch((err) => {
        console.error("Init error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData?.username) {
    return <UsernameSetup />
  }

  return (
    <div>
      <h1>Hello, {userData.username}!</h1><br/>
      <p>Score: {userData.score}</p><br/>
    </div>
  )
}



export default App;
