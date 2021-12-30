export default function Color(cid, theme, themes) {
	return "var( --" + cid + "-" + themes[theme] + ") ";
}
