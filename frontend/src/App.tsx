import { useState, useEffect, useRef } from "react";
import "./App.css";
import { BACKEND_URL } from "./config";
import { ProfileSetup } from "./components/ProfileSetup";
import { ProfileIMG } from "./components/profile/ProfileIMG";
import { type UserData } from "./types/types";

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

  const handleSetUsername = async (username: string, profileURL: string) => {
    try {
      const response = await fetch(`${BACKEND_URL}/users/update`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, profileURL }),
      });

      const data = await response.json();

      if (data.success) {
        console.log("Username updated:", data);
        setUserData({ ...userData, username, profileURL });
      } else {
        console.error("Update failed", data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData?.username) {
    return <ProfileSetup onSetData={handleSetUsername} />;
  }

  return (
    <div>
      <ProfileIMG
        src={userData.profileURL}
        width="w-35"
        height="h-35"
        round="rounded-lg"
        className="mx-auto mb-5"
      />
      <h1>Hello, {userData.username}!</h1>
      <br />
      <p>Score: {userData.score}</p>
      <br />
    </div>
  );
}

export default App;
