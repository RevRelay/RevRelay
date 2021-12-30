/*
  Message Component to display who sent the message, what they sent, and when they sent it
*/

import React from 'react'

function Message({author,text,time}) {
	return (
			<p className="user-message">{author}:&ensp;{text}&emsp;&emsp;{time}</p>
	)
}
export default Message
