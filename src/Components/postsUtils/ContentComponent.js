/**
 * Filters content and returns html
 * @param {contentProps} contentProps whats sent to contentComponets
 * @param {content} contentProps.content string to be parsed
 * @returns html with vids and youtube
 */
export default function ContentComponent(contentProps) {
	let comps = [];
	let st = contentProps.content;
	let tmp = st.split(/\s+/);
	comps = tmp.map((word) => {
		if (word.startsWith("<i=")) {
			return (
				<>
					<br />
					<img
						width="420"
						src={word.split("<i=")[1].split(">")[0]}
						alt={word.split("<i=")[1].split(">")[0]}
					/>
					<br />
				</>
			);
		} else if (word.startsWith("<v=")) {
			return (
				<>
					<br />
					<video
						controls
						src={word.split("<v=")[1].split(">")[0]}
						alt={word.split("<v=")[1].split(">")[0]}
					/>
					<br />
				</>
			);
		} else if (word.startsWith("<y")) {
			return (
				<>
					<br />

					<iframe
						allow="fullscreen;"
						height="315"
						src={
							"https://www.youtube.com/embed/" +
							word.split("<yt=")[1].split(">")[0].split("=")[1].split("&")[0]
						}
						alt={
							"https://www.youtube.com/embed/" +
							word.split("<yt=")[1].split(">")[0].split("=")[1].split("&")[0]
						}
					/>
					<br />
				</>
			);
		} else return " " + word;
	});
	return comps;
}
