import { useState, useEffect, useRef } from "react";
import "./App.css";
import { BACKEND_URL } from "./config";
import { ProfileSetup } from "./components/ProfileSetup";
import { type UserData } from "./types/types";
import { Container } from "./components/Container";
import { Toplist } from "./components/Toplist";
import { Game } from "./components/Game";
import { GameData } from "./components/GameData";
import { GameHeader } from "./components/GameHeader";

function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState<boolean>(false);
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

  const handleSetData = async (username: string, profileURL: string) => {
    try {
      const isFirstTimeSetup = !userData?.username;
      const requestBody: {
        username: string;
        profileURL: string;
        score?: number;
      } = {
        username,
        profileURL,
      };

      if (isFirstTimeSetup) {
        requestBody.score = 15000;
      }

      const response = await fetch(`${BACKEND_URL}/users/update`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data.success) {
        console.log("Username updated:", data);
        if (isFirstTimeSetup) {
          setUserData((prev) => ({
            ...prev,
            username,
            profileURL,
            score: 15000,
          }));
        } else {
          setUserData((prev) => ({ ...prev, username, profileURL }));
        }
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

  if (!userData?.username || editMode) {
    return <ProfileSetup onSetData={handleSetData} />;
  }

  if (editMode && userData) {
    return (
      <ProfileSetup
        onSetData={(username, profileURL) => {
          handleSetData(username, profileURL);
          setEditMode(false);
        }}
        initialUsername={userData?.username}
        initialProfileURL={userData?.profileURL}
      />
    );
  }

  if (userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#181c2b] overflow-hidden">
        <Container>
          <UserProvider initialUserData={userData}>
            <GameProvider>
              <div className="h-96 w-full max-w-sm md:max-w-md lg:max-w-xl mx-auto">
                <GameData></GameData>
              </div>
              <div className="h-96 w-full max-w-sm md:max-w-md lg:max-w-xl mx-auto">
                <Game></Game>
              </div>
              <div className="h-96 w-full max-w-sm md:max-w-md lg:max-w-xl mx-auto">
                <Toplist />
              </div>
            </GameProvider>
          </UserProvider>
        </Container>
      </div>
    );
  }
}

export default App;
