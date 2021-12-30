import React, {Component} from 'react';

class Active extends Component {
	render () {
		if (!this.props.typing || this.props.typing.length == 0) {
			return <p className="active-typing"></p>;
		}
		let text = "";
		for (var i=0; i<this.props.typing.length; i++) {
			text += this.props.typing[i]["username"];
			if (i == this.props.typing.length - 1) {
				text += " ";
			} else {
				text += ", ";
			}
		}
		if (this.props.typing.length == 1) {
			text += " is ";
		} else {
			text += " are ";
		}
		text += "typing";
		return <p className="active-typing">{text}</p>;
	}
}

export default Active;
