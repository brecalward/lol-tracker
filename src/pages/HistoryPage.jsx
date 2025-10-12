import { useAccountContext } from "../contexts/AccountContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
					// console.log(data.info.participants[0].puuid);
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
			// const gameData = previousMatchesById.forEach((match) => {
			// 	fetchData(match);
			// });
			// dispatch({ type: "getGameData", payload: gameData });
		},
		[previousMatchesById, puuid, dispatch]
	);

	// useEffect(
	// 	function () {
	// 		if (puuid === "") return;
	// 		async function fetchData() {
	// 			try {
	// 				const res = await fetch(
	// 					`https://americas.api.riotgames.com/lol/match/v5/matches/NA1_5386584488?api_key=${API_KEY}`
	// 				);
	// 				const data = await res.json();
	// 				// console.log(data.info.participants[0].puuid);
	// 				console.log(
	// 					data.info.participants.filter((player) => player.puuid === puuid)
	// 				);
	// 			} catch (error) {
	// 				console.log(error);
	// 			}
	// 		}
	// 		fetchData();
	// 	},
	// 	[puuid]
	// );

	useEffect(function () {
		if (gameName === "") {
			navigate("/");
		}
	}, []);
	return (
		<>
			{previousMatches &&
				previousMatches.map((match) => (
					<div className="border mx-20 flex h-15 gap-5 items-center justify-center">
						<h1>
							{/* <img src={`${champData[match.champName].image.full}`} /> */}
							{match.champName}
						</h1>
						<h2>Kills: {match.kills}</h2>
						<h2>Deaths: {match.deaths}</h2>
						<h2>Assists: {match.assists}</h2>
						<h2>Win: {match.win}</h2>
						<h2>CS: {match.totalMinionsKilled + match.neutralMinionsKilled}</h2>
					</div>
				))}
		</>
	);
}
