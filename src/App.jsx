import "./App.css";
import "./index.css";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import MasteryPage from "./pages/MasteryPage";
import HistoryPage from "./pages/HistoryPage";

function App() {
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
