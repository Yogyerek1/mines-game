import { useState, useEffect, useRef } from "react";
import "./App.css";
import { BACKEND_URL } from "./config";
import { ProfileSetup } from "./components/ProfileSetup";
//import { ProfileIMG } from "./components/profile/ProfileIMG";
//import { Button } from "./components/ui-interactive/Button";
import { type UserData } from "./types/types";
import { Container } from "./components/Container";
import { Toplist } from "./components/Toplist";
import { Game } from "./components/Game";
import { GameData } from "./components/GameData";
import type { CardModel } from "./models/CardModel";

function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [gameCards, setGameCards] = useState<CardModel[]>([]);
  const [isGameActive, setIsGameActive] = useState<boolean>(false);
  const [bet, setBet] = useState<number>(0);
  const [bombCount, setBombCount] = useState<number>(0);
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
    return <ProfileSetup onSetData={handleSetData} />;
  }

  if (editMode && userData) {
    return (
      <ProfileSetup
        onSetData={(username, profileURL) => {
          handleSetData(username, profileURL);
          setEditMode(false);
        }}
        initialUsername={userData.username}
        initialProfileURL={userData.profileURL}
      />
    );
  }

  if (userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#181c2b] overflow-hidden">
        <Container>
          {/*
            <div className="w-full flex flex-col items-center justify-center">
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
              <Button width="w-35" height="h-10" onClick={() => setEditMode(true)}>
                Edit
              </Button>
            </div>
          */}
          <div className="h-96 w-full max-w-sm md:max-w-md lg:max-w-xl mx-auto">
            <GameData
              userData={userData}
              onGameStart={(cards, bet, bombs) => {
                setGameCards(cards);
                setIsGameActive(true);
                setBet(bet);
                setBombCount(bombs);
                setUserData({ ...userData, score: userData.score - bet });
              }}
            ></GameData>
          </div>
          <div className="h-96 w-full max-w-sm md:max-w-md lg:max-w-xl mx-auto">
            <Game
              gameCards={gameCards}
              setGameCards={setGameCards}
              isGameActive={isGameActive}
              bet={bet}
              bombCount={bombCount}
            ></Game>
          </div>
          <div className="h-96 w-full max-w-sm md:max-w-md lg:max-w-xl mx-auto">
            <Toplist myUser={userData} />
          </div>
        </Container>
      </div>
    );
  }
}

export default App;
