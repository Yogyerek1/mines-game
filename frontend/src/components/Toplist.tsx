import { ProfileData } from "./profile/ProfileData";
import { type UserData } from "../types/types";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";

export function Toplist() {
  const { userData, refreshTrigger } = useUser();
  const [topList, setTopList] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTopList = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BACKEND_URL}/toplist`, {
          credentials: "include",
        });
        const data = await res.json();
        setTopList(data.toplist);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchTopList();
  }, [refreshTrigger]);

  if (loading) return <div>Loading toplist...</div>;
  if (!userData) return null;

  return (
    <div className="bg-[#181c23] border border-[#23283a] rounded-2xl w-full py-4 shadow-lg">
      <h1 className="text-white text-center text-lg font-bold mb-2">
        LEADERBOARD
      </h1>
      <hr className="border-[#23283a] mb-2" />
      <div className="flex flex-col gap-2 max-h-64 transition-all duration-500 overflow-y-hidden hover:overflow-y-auto">
        {topList.map((user, idx) => (
          <ProfileData
            key={idx}
            profileURL={user.profileURL ?? ""}
            username={user.username ?? ""}
            score={user.score ?? 0}
          />
        ))}
      </div>
      <div className="mt-2 px-4">
        <div className="h-1 bg-green-400 rounded-full"></div>
        <div className="text-green-400 text-center mt-1">You</div>
        <ProfileData
          profileURL={userData.profileURL ?? ""}
          username={userData.username ?? ""}
          score={userData.score ?? 0}
        />
      </div>
    </div>
  );
}

// Written by YogyerekDEV
