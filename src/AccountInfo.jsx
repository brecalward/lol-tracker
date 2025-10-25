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
      <div className=" flex mb-20 mt-10 items-center justify-between mx-25">
        {profilePicture && gameName && (
          <>
            <div className="rounded-full bg-rose-400 flex p-3 min-w-64">
              <Avatar>
                <AvatarImage src={profilePicture} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <p>{`${gameName} #${gameTag}`}</p>
            </div>
            <p>{summonerLevel && `Summoner Level: ${summonerLevel}`} </p>
            <p> {tier && `${tier}: ${rank}`}</p>
            <p>{lp && `${lp} LP`}</p>
            <Button onClick={() => navigate("/mastery")}>
              Champion Mastery
            </Button>

            <Button onClick={() => navigate("/history")}>Match history</Button>
          </>
        )}

        {/* {puuid} */}
      </div>
    </>
  );
}
