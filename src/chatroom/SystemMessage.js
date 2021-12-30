/*
  System message component to display a message such as "_____ has connected"
  Differently formatted from user Messages
*/

import React from 'react'

function SystemMessage({text}) {
	return (
	 <p className="system-message">{text}</p>
	)
}
export default SystemMessage