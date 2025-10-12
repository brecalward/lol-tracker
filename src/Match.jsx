export default function Match({ match }) {
	return (
		<>
			{match && (
				<div className="border mx-20 flex h-15 gap-5 items-center justify-center">
					<h1>
						{/* <img src={`${champData[match.champName].image.full}`} /> */}
						{match.champName}
					</h1>
					<h2>Kills: {match.kills}</h2>
					<h2>Deaths: {match.deaths}</h2>
					<h2>Assists: {match.assists}</h2>
					<h2>Win: {match.win}</h2>
					<h2>CS: {match.totalMinionsKilled + match.neutralMinionsKilled}</h2>
				</div>
			)}
		</>
	);
}
