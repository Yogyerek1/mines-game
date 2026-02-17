import { type UserData } from "../types/types"; 
import { ProfileData } from "./profile/ProfileData";

type GameHeaderProps = {
    myUser: UserData;
}

export function GameHeader({ myUser }:GameHeaderProps) {
    return (
        <header className="w-full h-30 flex justify-end py-4 sticky top-0 left-0 border-b border-gray-800">
            <h1 className="font-bold text-orange-400 ml-16 text-2xl text-left float-left flex-auto ">Mines-Game</h1>
        <div className="flex flex-row mr-16 mt-auto">
            <ProfileData
                profileURL={myUser.profileURL ?? ""}
                username={myUser.username ?? ""}
                score={myUser.score ?? 0}
            />
        </div>
        </header>
    );
}