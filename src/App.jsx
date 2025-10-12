import "./App.css";
import "./index.css";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import MasteryPage from "./pages/MasteryPage";
import HistoryPage from "./pages/HistoryPage";
import { useEffect } from "react";
import { useAccountContext } from "./contexts/accountContext";

function App() {
	const { dispatch } = useAccountContext();
	useEffect(
		function () {
			async function fetchChampData() {
				try {
					const res = await fetch(
						"https://ddragon.leagueoflegends.com/cdn/15.19.1/data/en_US/champion.json"
					);
					const data = await res.json();
					console.log("All Champ Data", data.data);
					dispatch({ type: "getChampData", payload: data.data });
				} catch (error) {
					console.log(error);
				}
			}
			fetchChampData();
		},
		[dispatch]
	);

	const dateObject = new Date(1760284554662);
	console.log(dateObject);
	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />}>
					<Route path="/mastery" element={<MasteryPage />} />
					<Route path="/history" element={<HistoryPage />} />
				</Route>
				{/* Add more routes as needed */}
			</Routes>
		</>
	);
}

export default App;
