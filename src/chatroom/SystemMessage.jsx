import React, {Component} from 'react';

class SystemMessage extends Component {
	render () {
		return <p className="system-message">{this.props.text}</p>;
	}
}

export default SystemMessage;
