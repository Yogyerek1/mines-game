import { type UserData } from "../types/types"; 
import { ProfileData } from "./profile/ProfileData";
import { useState, useEffect } from "react";

type GameHeaderProps = {
    myUser: UserData;
}

export function GameHeader({ myUser }:GameHeaderProps) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    
      useEffect(() => {
          const handleResize = () => setIsMobile(window.innerWidth < 768);
          window.addEventListener("resize", handleResize);
          return () => window.removeEventListener("resize", handleResize);
      }, []);

    return (
        <header className="w-full h-30 flex justify-end py-4 sticky top-0 left-0 border-b border-gray-800 items-center">
            <h1 className="font-bold text-orange-400 ml-16 text-2xl text-left float-left flex-auto text-nowrap ">Mines-Game</h1>
        <div className="flex flex-row mr-16">
            <ProfileData
                profileURL={myUser.profileURL ?? ""}
                username={myUser.username ?? ""}
                score={myUser.score ?? 0}
                scoreEnabled={false}
                usernameEnabled={!isMobile}
            />
        </div>
        </header>
    );
}