export default function Match({ match }) {
	console.log(match);
	return (
		<>
			{match && (
				<div className="border mx-20 flex h-15 gap-5 items-center justify-center">
					<h1>
						{/* <img src={`${champData[match.champName].image.full}`} /> */}
						{match.champName}
					</h1>
					<h2>
						{match.kills} / {match.deaths} / {match.assists}
					</h2>
					<h2>
						{match.win ? (
							<p className="text-green-500">Won</p>
						) : (
							<p className="text-red-500">Lost</p>
						)}
					</h2>
					<h2>CS: {match.totalMinionsKilled + match.neutralMinionsKilled}</h2>
				</div>
			)}
		</>
	);
}
