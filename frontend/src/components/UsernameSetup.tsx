import { useState } from "react";
import { ProfileIMG } from "./profile/ProfileIMG";
import { v4 as uuidv4 } from "uuid";

interface UsernameSetupProps {
  onSetUsername: (username: string, profileURL: string) => void;
}

export function UsernameSetup({ onSetUsername }: UsernameSetupProps) {
  const [username, setUsername] = useState("");
  const [profileURL, setProfileURL] = useState<string>(
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${uuidv4()}`,
  );
  const handleClick = () => {
    onSetUsername(username, profileURL);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="scale-100 md:scale-125 lg:scale-150 flex flex-col items-center gap-4">
        <span className="font-bold text-amber-100 text-4xl">
          Set Username...
        </span>
        <div className="flex items-center justify-center p-4 border border-emerald-700 rounded-lg bg-[#333333]">
          <div className="flex items-center space-x-2 w-full max-w-md">
            <ProfileIMG
              src={profileURL}
              round="rounded-lg"
              border="border-1 border-yellow-600"
              onClick={() => {
                setProfileURL(
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${uuidv4()}`,
                );
              }}
            />
            <input
              type="text"
              className="flex-1 border-3 border-black rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition duration-200 bg-amber-100 text-black placeholder-gray-600"
              placeholder="Add username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-200 whitespace-nowrap"
              onClick={handleClick}
            >
              Set
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
