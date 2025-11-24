import { useAccountContext } from "./contexts/AccountContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { useNavigate } from "react-router-dom";

export default function AccountInfo() {
  const navigate = useNavigate();
  const {
    profilePicture,
    gameName,
    gameTag,
    summonerLevel,
    tier,
    rank,
    puuid,
    lp,
  } = useAccountContext();
  return (
    <>
      <div className="flex items-center justify-between mb-20 mt-10 mx-25 gap-8">
        {profilePicture && gameName && (
          <>
            {/* Profile with avatar and username */}
            <div className="flex items-center bg-gray-800 rounded-full px-2 py-1 min-w-[16rem] gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-md">
                <img
                  src={profilePicture}
                  alt={`${gameName} avatar`}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-white font-semibold text-lg select-none">
                {`${gameName} #${gameTag}`}
              </p>
            </div>

            {/* Stats group */}
            <div className="flex items-center gap-6 text-white text-sm font-medium whitespace-nowrap">
              {summonerLevel && <p>Summoner Level: {summonerLevel}</p>}
              {tier && rank && <p>{`${tier}: ${rank}`}</p>}
              {lp && <p>{lp} LP</p>}
            </div>

            {/* Action buttons */}
            <div className="flex gap-4">
              <Button
                onClick={() => navigate("/mastery")}
                className="bg-gray-800 hover:bg-gray-700 text-white"
              >
                Champion Mastery
              </Button>
              <Button
                onClick={() => navigate("/history")}
                className="bg-gray-800 hover:bg-gray-700 text-white"
              >
                Match history
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
