/*
  System message component to display a message such as "_____ has connected"
  Differently formatted from user Messages
*/

import React, {Component} from 'react';

class SystemMessage extends Component {
	render () {
		return <p className="system-message">{this.props.text}</p>;
	}
}

export default SystemMessage;
