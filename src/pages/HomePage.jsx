import React from "react";
import { Card } from "@/components/ui/card";
import NavBar from "../NavBar";
import SearchAccount from "../SearchAccount";
import { Outlet } from "react-router-dom";

function HomePage() {
	return (
		<>
			<Card className="bg-black text-white">
				<NavBar />
				<SearchAccount />
				<Outlet />
			</Card>
		</>
	);
}

export default HomePage;
