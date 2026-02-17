import { type UserData } from "../../types/types";
import { ProfileIMG } from "./ProfileIMG";

type ProfileDataProps = {
  scoreEnabled ?: boolean;
} & UserData;

export function ProfileData({ profileURL, username, score, scoreEnabled=true }: ProfileDataProps) {
  return (
    <div className="flex items-center justify-between w-full px-4 py-2 gap-3">
      <ProfileIMG
        src={profileURL}
        width="w-13"
        height="h-13"
        round="rounded-full"
        border="border border-emerald-600"
      />
      <span className="flex-1 text-white text-center">{username}</span>
      {scoreEnabled && <span className="text-green-400 font-semibold">${score}</span>}
    </div>
  );
}

// Written by YogyerekDEV
