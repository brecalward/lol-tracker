export default function Match({ match }) {
	console.log(match);

	return (
		<>
			{match && (
				<div className="border mx-20 flex h-15 gap-5 items-center rounded-full">
					<h3
						className={`mr-auto ml-5 px-3 rounded-full ${
							match?.gameMode?.split(" ")[0] === "Ranked"
								? "bg-blue-500"
								: "bg-indigo-700"
						}`}
					>
						{match.gameMode}
					</h3>
					<h1 className="mr-auto">
						{/* <img src={`${champData[match.champName].image.full}`} /> */}
						{match.champName}
					</h1>
					<h2 className="justify-self-center">
						{match.kills} / {match.deaths} / {match.assists}
					</h2>
					<h2>
						{match.win ? (
							<p className="text-green-900">Won</p>
						) : (
							<p className="text-red-500">Lost</p>
						)}
					</h2>
					<h2 className="mr-5">
						CS: {match.totalMinionsKilled + match.neutralMinionsKilled}
					</h2>
				</div>
			)}
		</>
	);
}
