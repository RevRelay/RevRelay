export default function ContentComponent(contentProps) {
	let comps = [];
	let st = contentProps.content;
	let tmp = st.split(/\s+/);
	comps = tmp.map((word) => {
		console.log(word);
		if (word.startsWith("<i=")) {
			console.log(word.split("<i=")[1].split(">")[0]);
			return (
				<img
					src={word.split("<i=")[1].split(">")[0]}
					alt={word.split("<i=")[1].split(">")[0]}
				/>
			);
		} else if (word.startsWith("<y")) {
			console.log(
				"https://www.youtube.com/embed/" +
					word.split("<yt=")[1].split(">")[0].split("=")[1].split("&")[0]
			);
			return (
				<>
					<br />

					<iframe
						width="420"
						height="315"
						src={
							"https://www.youtube.com/embed/" +
							word.split("<yt=")[1].split(">")[0].split("=")[1].split("&")[0]
						}
						alt={
							"https://www.youtube.com/embed/" +
							word.split("<yt=")[1].split(">")[0].split("=")[0].split("&")[0]
						}
					/>
					<br />
				</>
			);
		} else return " " + word;
	});
	return comps;
}
