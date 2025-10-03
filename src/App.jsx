import { useState, useEffect } from "react";
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

const API_KEY = import.meta.env.VITE_API_KEY; // Accesses variables prefixed with VITE_
const BASE_URL =
	"https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id";
const CHAMP_DATA =
	"https://ddragon.leagueoflegends.com/cdn/15.19.1/data/en_US/champion.json";

function App() {
	const [gameName, setGameName] = useState("");
	const [gameTag, setGameTag] = useState("");
	const [account, setAccount] = useState(null);
	const [champInfo, setChampInfo] = useState(null);
	const [allChamps, setAllChamps] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [champData, setChampData] = useState({});

	async function handleSearchNameAndTag() {
		if (!gameName || !gameTag) return;
		try {
			const res = await fetch(
				`${BASE_URL}/${gameName}/${gameTag}?api_key=${API_KEY}`
			);
			const data = await res.json();
			console.log(data);
			setAccount({
				gameName: data.gameName,
				tagLine: data.tagLine,
				puuid: data.puuid,
			});
			// setPuuid(data.puuid)
		} catch (error) {
			console.log(error);
		}
	}
	useEffect(
		function () {
			async function handleSearchChampionStats() {
				if (!account) return;
				try {
					const res = await fetch(
						`https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${account.puuid}?api_key=${API_KEY}`
					);
					const data = await res.json();
					setChampInfo(data);
					console.log(data);
				} catch (error) {
					console.log(error);
				}
			}
			handleSearchChampionStats();
		},
		[account]
	);

	function getChampionById(id) {
		for (const champName in allChamps) {
			const champion = allChamps[champName];
			if (champion.key === String(id)) {
				return champion.name;
			}
		}
	}

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

			setChampData(newChampData); // Set state once after loop
		}

		fetchAllChampions();
	}, []);

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
						value={gameName}
						onChange={(e) => setGameName(e.target.value)}
					/>
				</div>
				<div className="flex justify-center gap-10 mt-10">
					<label htmlFor="gameTag" value="Game name:">
						Game tag:
					</label>
					<Input
						id="gameTag"
						className="w-60"
						value={gameTag}
						onChange={(e) => setGameTag(e.target.value)}
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
				{account && `${account.gameName} #${account.tagLine}`}
			</Card>
			<Card className="bg-black text-white p-5">
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
						{champInfo?.map((champ) => (
							<TableRow key={champ.championId}>
								<TableCell className="font-medium">
									{champ.championId}
								</TableCell>
								<TableCell className="font-medium">
									{getChampionById(champ.championId)}
								</TableCell>
								<TableCell className="font-medium">
									<img
										src={`https://ddragon.leagueoflegends.com/cdn/15.19.1/img/champion/${
											champData[champ.championId].image.full
										}`}
										alt={champData.name}
										width="64"
										height="64"
									/>
								</TableCell>
								<TableCell className="font-medium">
									{champData[champ.championId].partype}
								</TableCell>
								<TableCell className="font-medium">
									{champ.championPoints}
								</TableCell>
								<TableCell className="font-medium">
									{champ.championLevel}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Card>
		</>
	);
}

export default App;
