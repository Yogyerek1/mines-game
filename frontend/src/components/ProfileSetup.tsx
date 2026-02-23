import { useState } from "react";
import { ProfileIMG } from "./profile/ProfileIMG";
import { v4 as uuidv4 } from "uuid";
import { Button } from "./ui-interactive/Button";

type ProfileSetupProps = {
  onSetData: (username: string, profileURL: string) => void;
  initialUsername?: string;
  initialProfileURL?: string;
};

export function ProfileSetup({
  onSetData,
  initialUsername = "",
  initialProfileURL,
}: ProfileSetupProps) {
  const [username, setUsername] = useState(initialUsername);
  const [profileURL, setProfileURL] = useState<string>(
    initialProfileURL ||
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${uuidv4()}`,
  );
  const handleClick = () => {
    onSetData(username, profileURL);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#181c2b]">
      <div className="scale-100 md:scale-125 lg:scale-150 flex flex-col items-center gap-4">
        <span className="font-bold text-amber-100 text-4xl">
          Set profile...
        </span>
        <div className="flex items-center justify-center p-4 border border-emerald-700 rounded-lg bg-[#333333]">
          <div className="flex items-center space-x-2 w-full max-w-md">
            <ProfileIMG
              src={profileURL}
              round="rounded-lg"
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-200 whitespace-nowrap"
              onClick={handleClick}
            >
              Set
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
