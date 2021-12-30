import React, {Component} from 'react';

class Message extends Component {
	render () {
		return <p>[{this.props.author}]:&ensp{this.props.text}&emsp;&emsp;({this.props.time})</p>;
	}
}

export default Message;
