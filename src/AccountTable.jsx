import { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useAccountContext } from "./contexts/AccountContext";

export default function AccountTable() {
	const [champData, setChampData] = useState({});
	const { accountMasteryChampInfo } = useAccountContext();

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
	return (
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
				{accountMasteryChampInfo?.map((champ) => {
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
	);
}
