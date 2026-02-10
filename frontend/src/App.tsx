import { useState, useEffect } from "react";
import "./App.css";
import { BACKEND_URL } from "./config";

interface UserData {
  username?: string;
  score?: number;
  profileURL?: string;
}

function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

function UsernameSetup() { // just to pass error and see it is working
  return (
    <div>
      <h1>Set username...</h1>
    </div>
  )
}

export default App;
