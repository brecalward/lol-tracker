import { useEffect } from "react";
import "./App.css";
import { Card } from "@/components/ui/card";
import "./index.css";
import { useAccountContext } from "./contexts/AccountContext";
import NavBar from "./NavBar";
import SearchAccount from "./SearchAccount";
import AccountTable from "./AccountTable";

const CHAMP_DATA =
  "https://ddragon.leagueoflegends.com/cdn/15.19.1/data/en_US/champion.json";
const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const { gameName, gameTag, puuid, dispatch, summonerLevel, champInfo } =
    useAccountContext();

  useEffect(
    function () {
      async function handleSearchChampionStats() {
        if (!puuid) return;
        try {
          const res = await fetch(
            `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}?api_key=${API_KEY}`
          );
          const data = await res.json();
          dispatch({ type: "getAccountChampData", payload: data });
          console.log("fetched champ info from riot api", data);
        } catch (error) {
          console.log(error);
          console.error(error.message);
        }
      }
      async function getAccountLevel() {
        if (!puuid) return;
        try {
          const res = await fetch(
            `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${API_KEY}`
          );
          const data = await res.json();
          console.log(data.summonerLevel);
          dispatch({ type: "getSummonerLevel", payload: data.summonerLevel });
        } catch (error) {
          console.log(error);
          console.error(error.message);
        }
      }
      handleSearchChampionStats();
      getAccountLevel();
    },
    [puuid, dispatch]
  );

  useEffect(
    function () {
      if (!puuid) return;
      async function fetchMatches() {
        try {
          const res = await fetch(
            `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${API_KEY}`
          );
          const data = await res.json();
          console.log("List of match id's from riot api", data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchMatches();
    },
    [puuid]
  );

  return (
    <>
      <Card className="bg-black text-white">
        <NavBar />
        <SearchAccount />
        {gameName && <AccountTable />}
      </Card>
    </>
  );
}

export default App;
