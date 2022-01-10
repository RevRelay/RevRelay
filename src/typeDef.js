import { Dispatch, SetStateAction } from "react";
import { Socket } from "socket.io-client";

/**
 * @typedef {Object} 	JWTs	The Array for an object that just contains a JWT.
 * @property {String}	token	JWT Token determinig user and log in information.
 */

/**
 * @typedef {Object} 	SetJWTs					The Array for an object that just contains the setter for the JWT.
 * @property {SetStateActionString}	setToken	State variable setter for JWT token field information.
 */

/**
 * @typedef {Object}	UserProp	The Array for an object that just contains a User.
 * @property {User}		user		The Array for a User.
 */

/**
 * @typedef {Object} 	User		The Array for a User. Does not include the password or userID.
 * @property {String} 	username	The logged in user's username.
 * @property {String} 	firstName	The logged in user's first name.
 * @property {String} 	lastName	The logged in user's last name.
 * @property {String} 	email		The logged in user's email.
 * @property {Date} 	birthDate	The logged in user's birth date.
 * @property {String}	displayName	The logged in user's display name.
 */

/**
 * @typedef {Object} 	RegisterUser	The Array for a User when registering. Does not include userID, names, or birth date.
 * @property {String} 	username		The registering user's username.
 * @property {String}	password		The registering user's password.
 * @property {String} 	email			The registering user's email.
 * @property {String}	displayName		The registering user's display name.
 */

/**
 * @typedef {Object} 	LoginUser	The Array for a User when logging in. Does not include userID, email, display, names, or birth date.
 * @property {String} 	username	The logging in user's username.
 * @property {String}	password	The logging in user's password.
 */

/**
 * @typedef {Object} 	Toggle		The Array for which variable of the User Array are we trying to update. True is editing. False is not editing.
 * @property {Boolean} 	username 	Is the user's username being edited?
 * @property {Boolean} 	firstName	Is the user's first name being edited?
 * @property {Boolean} 	lastName	Is the user's last name being edited?
 * @property {Boolean}	email		Is the user's email being edited?
 * @property {Boolean} 	birthDate	Is the user's birth date being edited?
 * @property {Boolean}	displayName	Is the user's display name being edited?
 */

/**
 * @typedef {Object}				VarEditInfo				The Array for Editing user information that info is in a map.
 * @property {String}				varname 				The variable name associated with the list element (i.e. username).
 * @property {String} 				fieldName 				The display name of the list element (i.e. Username).
 * @property {User} 				mostRecentUserInfo 		Array for a state variable holding user field information.
 * @property {SetStateActionUser} 	setUserInput 			State variable setter for userInput field information.
 * @property {SetStateActionUser} 	setMostRecentUserInfo 	State variable setter for mostRecentUserInfo field information.
 * @property {Toggle} 				toggleEdit 				Array for a state variable for determining if a field is toggled to display (false) or edit (true). 
 * @property {SetStateActionTog}	setToggleEdit			State variable setter for toggleEdit field information. 
 */

/**
 * @typedef {Object}				EditInfo				The Array for Editing user information. 
 * @property {User} 				mostRecentUserInfo 		Array for a state variable holding user field information.
 * @property {SetStateActionUser} 	setUserInput 			State variable setter for userInput field information.
 * @property {SetStateActionUser} 	setMostRecentUserInfo	State variable setter for userInput field information.
 * @property {Toggle} 				toggleEdit 				Array for a state variable for determining if a field is toggled to display (false) or edit (true). 
 * @property {SetStateActionTog}	setToggleEdit 			State variable setter for toggleEdit field information. 
 */

/**
 * @typedef {Object}	PasswordCheck	An Array with 2 Strings used to check if the two new password inputs are the same.
 * @property {String}	newPassword 	The new password.
 * @property {String}	confirmPassword	New password repeated. Needs to be the same at the new password.
 */

/**
 * @typedef {Object} 	ChatRoom
 * @property {Socket}	socket
 * @property {String}	username 	The username of the current user.
 * @property {String}	room		The name of the room you are currently in.
 */

/**
 * @typedef {Object} 	Page
 * @property {String} 	bannerURL
 * @property {String} 	description
 * @property {Boolean} 	groupPage
 * @property {Number} 	pageID
 * @property {String} 	pageTitle
 * @property {any[]}	posts
 * @property {Boolean} 	private
 */

/**
 * @typedef {Object} 	postPage
 * @property {Number}	pageID
 */

/**
 * @typedef {Object}	Post 
 * @property {postPage} postPage
 * @property {String} 	postType
 * @property {String} 	postTitle
 * @property {String} 	postContent
 * @property {Number} 	postLikes
 * @property {Number} 	postTime
 * @property {Number} 	postOwnerID
 * @property {Object}	children
 */

/**
 * @typedef {Object}				NavBar					An Array for the Nav to determine the theme and update the theme.
 * @param {any[]}	 				themes 				Load all of the List of Themes.
 * @param {Number} 					activeTheme 		Integer referencing the current theme.
 * @param {SetStateActionNumber}	updateActiveTheme	State variable setter of activeTheme.
 * @param {SetStateActionString} 	setToken			State variable setter of token.
 */

/**
 * @typedef {Object}	Group		An Array for a Group.
 * @property {String} 	groupName	Name of the Group.
 * @property {Boolean} 	isPrivate	Is the group private (false) or not (true).
 * @property {User[]}	members		List of users in a group.
 */

/**
 * @typedef 	{Object}					PasswordProp	An Array for Password Prop to show or not show the password in forms.
 * @property 	{String} 					id 				TextField ID.
 * @property 	{String} 					label 			TextField label.
 * @property 	{String} 					password 		State variable holding the password.
 * @property 	{SetStateActionString} 		setter 			Setter function for the state variable holding the text field value. 
 */

/**
 * @typedef {Object}				LoginProp	An Array for Login Prop for Login so that the length of the hidden/unhidden 
 * 												password isn't a different lenght.
 * @param {String} 					id 			TextField ID.
 * @param {String} 					abel 		TextField label.
 * @param {String} 					value 		State variable holding the value.
 * @param {SetStateActionString}	setter 		Setter function for the state variable holding the text field value. 
 * @param {Boolean} 				required 	True if required, false otherwise.
 */

/**
 * @typedef {Dispatch<SetStateAction<String>>} SetStateActionString
 */

/**
 * @typedef {Dispatch<SetStateAction<Number>>} SetStateActionNumber
 */

/**
 * @typedef {Dispatch<SetStateAction<Boolean>>} SetStateActionBool
 */

/**
 * @typedef {Dispatch<SetStateAction<Date>>} SetStateActionDate
 */

/**
 * @typedef {Dispatch<SetStateAction<{
 * 		username: 		String;
 * 		firstName: 		String;
 * 		lastName: 		String;
 * 		email: 			String;
 * 		birthDate: 		Date;
 * 		displayName: 	String;
 * }>>} SetStateActionUser
 */

/**
 * @typedef {Dispatch<SetStateAction<{
 * 		username: 		Boolean,
 * 		firstName: 		Boolean,
 * 		lastName: 		Boolean,
 * 		email: 			Boolean,
 * 		birthDate: 		Boolean,
 * 		displayName: 	Boolean
 * }>>} SetStateActionTog
 */

/**
 * 
 * @typedef {Dispatch<SetStateAction<{
 * 		socket: 	Socket,
 * 		username: 	String,
 * 		room: 		Boolean,
 * }>>} SetStateActionChatRoom
 */

/**
 * @typedef {Dispatch<SetStateAction<{
 * 		bannerURL: 		String;
 * 		description: 	String;
 * 		groupPage: 		Boolean;
 * 		pageID: 		Number;
 * 		pageTitle: 		String;
 * 		posts: 			any[];
 * 		private: 		Boolean;
 * }>>} SetStateActionPage
 */


