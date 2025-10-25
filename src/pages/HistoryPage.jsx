import { useAccountContext } from "../contexts/AccountContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Match from "../Match";

const API_KEY = import.meta.env.VITE_API_KEY;

export default function HistoryPage() {
	const {
		previousMatchesById,
		previousMatches,
		puuid,
		gameName,
		dispatch,
		champData,
	} = useAccountContext();
	const navigate = useNavigate();

	function getGameMode(id) {
		switch (id) {
			case 420:
				return "Ranked Solo/Duo";
			case 440:
				return "Ranked Flex";
			case 450:
				return "ARAM";
			case 400:
				return "Normal Draft";
			case 430:
				return "Normal Blind Pick";
			case 1700:
				return "Arena";
			default:
				break;
		}
	}

	useEffect(
		function () {
			if (previousMatchesById === undefined || previousMatchesById.length === 0)
				return;
			async function fetchData(id) {
				try {
					const res = await fetch(
						`https://americas.api.riotgames.com/lol/match/v5/matches/${id}?api_key=${API_KEY}`
					);
					const data = await res.json();
					const playerGame = data.info.participants.find(
						(player) => player.puuid === puuid
					);
					if (!playerGame) return;
					return {
						win: playerGame.win,
						champName: playerGame.championName,
						kills: playerGame.kills,
						deaths: playerGame.deaths,
						assists: playerGame.assists,
						lane: playerGame.individualPosition,
						totalMinionsKilled: playerGame.totalMinionsKilled,
						neutralMinionsKilled: playerGame.neutralMinionsKilled,
						gameMode: getGameMode(data.info.queueId),
					};
				} catch (error) {
					console.log(error);
				}
			}

			async function fetchAll() {
				const gameData = await Promise.all(
					previousMatchesById.map((matchId) => fetchData(matchId))
				);
				const filtered = gameData.filter((item) => item !== null);
				dispatch({ type: "getGameData", payload: filtered });
			}
			fetchAll();
		},
		[previousMatchesById, puuid, dispatch]
	);

	useEffect(function () {
		if (gameName === "") {
			navigate("/");
		}
	}, []);
	return (
		<>
			<div className="mb-15 flex flex-col gap-4">
				{previousMatches &&
					previousMatches.map((match) => <Match match={match} />)}
			</div>
		</>
	);
}
