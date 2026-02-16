import { ProfileData } from "./profile/ProfileData";

export function Toplist() {
  return (
    <div className="bg-[#181c23] border border-[#23283a] rounded-2xl w-72 py-4 shadow-lg">
      <h1 className="text-white text-center text-lg font-bold mb-2">
        LEADERBOARD
      </h1>
      <hr className="border-[#23283a] mb-2" />
      <div className="flex flex-col gap-2 max-h-64 transition-all duration-500 overflow-y-hidden hover:overflow-y-auto">
        <ProfileData
          profileURL="https://api.dicebear.com/7.x/avataaars/svg?seed=${uuidv4()}"
          username="test"
          score={1500}
        ></ProfileData>
        <ProfileData
          profileURL="https://api.dicebear.com/7.x/avataaars/svg?seed=${uuidv4()}"
          username="test"
          score={1500}
        ></ProfileData>
        <ProfileData
          profileURL="https://api.dicebear.com/7.x/avataaars/svg?seed=${uuidv4()}"
          username="test"
          score={1500}
        ></ProfileData>
        <ProfileData
          profileURL="https://api.dicebear.com/7.x/avataaars/svg?seed=${uuidv4()}"
          username="test"
          score={1500}
        ></ProfileData>
        <ProfileData
          profileURL="https://api.dicebear.com/7.x/avataaars/svg?seed=${uuidv4()}"
          username="test"
          score={1500}
        ></ProfileData>
        <ProfileData
          profileURL="https://api.dicebear.com/7.x/avataaars/svg?seed=${uuidv4()}"
          username="test"
          score={1500}
        ></ProfileData>
      </div>
      <div className="mt-2 px-4">
        <div className="h-1 bg-green-400 rounded-full"></div>
        <div className="text-green-400 text-center mt-1">You</div>
        <ProfileData
          profileURL="https://api.dicebear.com/7.x/avataaars/svg?seed=${uuidv4()}"
          username="test"
          score={1500}
        ></ProfileData>
      </div>
    </div>
  );
}
