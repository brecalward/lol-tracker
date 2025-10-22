import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAccountContext } from "./contexts/accountContext";
import AccountInfo from "./AccountInfo";

export default function SearchAccount() {
	const [gameNameInput, setGameNameInput] = useState("");
	const [gameTagInput, setGameTagInput] = useState("");
	const [isExpanded, setIsExpanded] = useState(true);
	const {
		gameName,
		gameTag,
		dispatch,
		summonerLevel,
		puuid,
		tier,
		rank,
		profilePictureId,
		profilePicture,
	} = useAccountContext();
	const API_KEY = import.meta.env.VITE_API_KEY;
	const prevMatchCount = 10;
	const CHAMP_DATA =
		"https://ddragon.leagueoflegends.com/cdn/15.19.1/data/en_US/champion.json";

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
			setIsExpanded(false);

			// setPuuid(data.puuid)
		} catch (error) {
			console.log(error);
		}
	}

	function handleToggleInput() {
		setIsExpanded(!isExpanded);
	}
	useEffect(
		function () {
			async function getRank() {
				if (!puuid) return;
				try {
					const res = await fetch(
						`https://na1.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}?api_key=${API_KEY}`
					);
					const data = await res.json();

					console.log(data[0].tier);
					const tier = `${data[0].tier
						.toLowerCase()
						.charAt(0)
						.toUpperCase()}${data[0].tier.substring(1).toLowerCase()}`;
					dispatch({
						type: "getRank",
						payload: {
							tier,
							rank: data[0].rank,
						},
					});
				} catch (error) {
					console.log(error);
				}
			}

			async function getProfilePictureId() {
				if (!puuid) return;
				try {
					const res = await fetch(
						`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${API_KEY}`
					);
					const data = await res.json();
					dispatch({ type: "getProfileId", payload: data.profileIconId });
					console.log("profile picture id data", data.profileIconId);
				} catch (error) {
					console.log(error);
				}
			}
			getRank();
			getProfilePictureId();
		},
		[puuid, API_KEY, dispatch]
	);

	useEffect(
		function () {
			if (!profilePictureId) return;
			async function getProfilePicture() {
				try {
					const res = await fetch(
						`https://ddragon.leagueoflegends.com/cdn/15.19.1/img/profileicon/${profilePictureId}.png`
					);
					const data = await res.blob();
					const objectUrl = URL.createObjectURL(data);
					dispatch({ type: "getProfilePicture", payload: objectUrl });
				} catch (error) {
					console.log(error);
				}
			}
			getProfilePicture();
		},
		[profilePictureId, dispatch]
	);

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
		[puuid, dispatch, API_KEY]
	);

	useEffect(
		function () {
			if (!puuid) return;
			async function fetchMatches() {
				try {
					const res = await fetch(
						`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${prevMatchCount}&api_key=${API_KEY}`
					);
					const data = await res.json();
					console.log("List of match id's from riot api", data);
					dispatch({ type: "getPreviousMatches", payload: data });
				} catch (error) {
					console.log(error);
				}
			}
			fetchMatches();
		},
		[puuid, dispatch, API_KEY]
	);
	return (
		<>
			<div className="mt-5 flex justify-end mr-25">
				<Button className="w-10 h-10" onClick={handleToggleInput}>
					{isExpanded ? "-" : "+"}
				</Button>
			</div>
			{isExpanded ? (
				<>
					<div className="flex justify-center gap-10 mt-10">
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
				</>
			) : (
				""
			)}
			<AccountInfo />
		</>
	);
}
