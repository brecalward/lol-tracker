import AccountTable from "../AccountTable";
import { useAccountContext } from "../contexts/AccountContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function MasteryPage() {
	const { gameName } = useAccountContext();
	const navigate = useNavigate();

	useEffect(
		function () {
			if (gameName === "") {
				navigate("/");
			}
		},
		[gameName, navigate]
	);
	return (
		<>
			<AccountTable />
		</>
	);
}
