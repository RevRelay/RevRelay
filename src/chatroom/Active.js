
import React from 'react'

function Active({typing}) {
		if (!(typing) || typing.length === 0) {
			return <p className="active-typing"></p>;
		}
		let text = "";
		for (var i=0; i<typing.length; i++) {
			text += typing[i]["username"];
			if (i === typing.length - 1) {
				text += " ";
			} else {
				text += ", ";
			}
		}
		if (typing.length === 1) {
			text += " is ";
		} else {
			text += " are ";
		}
		text += "typing";
		return <p className="active-typing">{text}</p>;
	}
export default Active
