import { useState, useEffect, useReducer } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import "./index.css";
import { initialState, accountReducer } from "./reducers/AccountReducer";
import { useAccountContext } from "./contexts/AccountContext";

const API_KEY = import.meta.env.VITE_API_KEY; // Accesses variables prefixed with VITE_
const CHAMP_DATA =
	"https://ddragon.leagueoflegends.com/cdn/15.19.1/data/en_US/champion.json";

function App() {
	const [gameNameInput, setGameNameInput] = useState("");
	const [gameTagInput, setGameTagInput] = useState("");
	const [champData, setChampData] = useState({});
	const { gameName, gameTag, puuid, dispatch, summonerLevel, champInfo } =
		useAccountContext();

	async function handleSearchNameAndTag() {
		if (!gameNameInput || !gameTagInput) return;
		dispatch({ type: "clearAccountInfo" });
		try {
			const res = await fetch(
				`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameNameInput}/${gameTagInput}?api_key=${API_KEY}`
			);
			const data = await res.json();
			console.log("Account info from riot api", data);
			dispatch({
				type: "getNameAndTag",
				payload: {
					gameName: data.gameName,
					gameTag: data.tagLine,
					puuid: data.puuid,
				},
			});

			// setPuuid(data.puuid)
		} catch (error) {
			console.log(error);
		}
	}
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

	useEffect(() => {
		async function fetchAllChampions() {
			const res = await fetch(
				"https://ddragon.leagueoflegends.com/cdn/15.19.1/data/en_US/champion.json"
			);
			const data = await res.json();
			const champs = data.data;

			// Build a new object with champion key as the key
			const newChampData = {};

			for (const champName in champs) {
				const champion = champs[champName];
				newChampData[champion.key] = {
					name: champion.name,
					image: champion.image,
					partype: champion.partype,
					stats: champion.stats,
					tags: champion.tags,
					title: champion.title,
				};
			}
			console.log("champ data fetched from external website", newChampData);

			setChampData(newChampData); // Set state once after loop
		}

		fetchAllChampions();
	}, []);

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
				<div className="flex justify-center gap-10 mt-20">
					<label htmlFor="gameName" value="Game name:">
						Game name:
					</label>
					<Input
						id="gameName"
						className="w-60"
						value={gameNameInput}
						onChange={(e) => setGameNameInput(e.target.value)}
					/>
				</div>
				<div className="flex justify-center gap-10 mt-10">
					<label htmlFor="gameTag" value="Game name:">
						Game tag:
					</label>
					<Input
						id="gameTag"
						className="w-60"
						value={gameTagInput}
						onChange={(e) => setGameTagInput(e.target.value)}
					/>
				</div>
				<Button
					className="mt-15 w-40 bg-green-500 hover:bg-green-600"
					onClick={handleSearchNameAndTag}
				>
					Search
				</Button>
				<br />
				<br />
				<br />
				{gameName && `${gameName} #${gameTag}`}
				<br />
				{summonerLevel && `Summoner Level: ${summonerLevel}`}
			</Card>
			<Card className="bg-black text-white p-5">
				{champInfo?.length === 0 && (
					<p className="text-white text-center mt-4">No champion data found.</p>
				)}
				{champInfo?.length > 0 && Object.keys(champData).length > 0 && (
					<Table></Table>
				)}
				<Table>
					<TableCaption>A list of your recent champions.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">ID</TableHead>
							<TableHead className="w-[100px]">Champion</TableHead>
							<TableHead className="w-[100px]">Image</TableHead>
							<TableHead className="w-[100px]">Resource</TableHead>
							<TableHead className="w-[100px]">Champion Points</TableHead>
							<TableHead className="w-[100px]">Champion Level</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{champInfo?.map((champ) => {
							const champDetails = champData[String(champ.championId)];
							if (!champDetails) {
								console.warn(`Missing champData for ID: ${champ.championId}`);
								return null; // Skip this row
							}

							return (
								<TableRow key={champ.championId}>
									<TableCell>{champ.championId}</TableCell>
									<TableCell>{champDetails.name}</TableCell>
									<TableCell>
										<img
											src={`https://ddragon.leagueoflegends.com/cdn/15.19.1/img/champion/${champDetails.image.full}`}
											alt={champDetails.name}
											width="64"
											height="64"
										/>
									</TableCell>
									<TableCell>{champDetails.partype}</TableCell>
									<TableCell>{champ.championPoints}</TableCell>
									<TableCell>{champ.championLevel}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</Card>
		</>
	);
}

export default App;
