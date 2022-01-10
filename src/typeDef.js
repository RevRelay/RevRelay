import { Dispatch, SetStateAction } from "react";
import { Socket } from "socket.io-client";

/**
 * @typedef {object} 	JWTs	The Array for an object that just contains a JWT.
 * @property {string}	token	JWT Token determinig user and log in information.
 */

/**
 * @typedef {object} 	SetJWTs					The Array for an object that just contains the setter for the JWT.
 * @property {SetStateActionString}	setToken	State variable setter for JWT token field information.
 */

/**
 * @typedef {object}	UserProp	The Array for an object that just contains a User.
 * @property {User}		user		The Array for a User.
 */

/**
 * @typedef {object} 	User		The Array for a User. Does not include the password or userID.
 * @property {string} 	username	The logged in user's username.
 * @property {string} 	firstName	The logged in user's first name.
 * @property {string} 	lastName	The logged in user's last name.
 * @property {string} 	email		The logged in user's email.
 * @property {Date} 	birthDate	The logged in user's birth date.
 * @property {string}	displayName	The logged in user's display name.
 */

/**
 * @typedef {object} 	RegisterUser	The Array for a User when registering. Does not include userID, names, or birth date.
 * @property {string} 	username		The registering user's username.
 * @property {string}	password		The registering user's password.
 * @property {string} 	email			The registering user's email.
 * @property {string}	displayName		The registering user's display name.
 */

/**
 * @typedef {object} 	LoginUser	The Array for a User when logging in. Does not include userID, email, display, names, or birth date.
 * @property {string} 	username	The logging in user's username.
 * @property {string}	password	The logging in user's password.
 */

/**
 * @typedef {object} 	Toggle		The Array for which variable of the User Array are we trying to update. True is editing. False is not editing.
 * @property {boolean} 	username 	Is the user's username being edited?
 * @property {boolean} 	firstName	Is the user's first name being edited?
 * @property {boolean} 	lastName	Is the user's last name being edited?
 * @property {boolean}	email		Is the user's email being edited?
 * @property {boolean} 	birthDate	Is the user's birth date being edited?
 * @property {boolean}	displayName	Is the user's display name being edited?
 */

/**
 * @typedef {object}	PasswordCheck	An Array with 2 Strings used to check if the two new password inputs are the same.
 * @property {string}	newPassword 	The new password.
 * @property {string}	confirmPassword	New password repeated. Needs to be the same at the new password.
 */

/**
 * @typedef {object} 	ChatRoom
 * @property {Socket}	socket
 * @property {string}	username 	The username of the current user.
 * @property {string}	room		The name of the room you are currently in.
 */

/**
 * @typedef {object} 	Page
 * @property {string} 	bannerURL
 * @property {string} 	description
 * @property {boolean} 	groupPage
 * @property {number} 	pageID
 * @property {string} 	pageTitle
 * @property {any[]}	posts
 * @property {boolean} 	private
 */

/**
 * @typedef {object} 	postPage
 * @property {number}	pageID
 */

/**
 * @typedef {object}	Post 
 * @property {postPage} postPage
 * @property {string} 	postType
 * @property {string} 	postTitle
 * @property {string} 	postContent
 * @property {number} 	postLikes
 * @property {number} 	postTime
 * @property {number} 	postOwnerID
 * @property {object}	children
 */

/**
 * @typedef 	{object}					PasswordProp	An Array for Password Prop to show or not show the password in forms.
 * @property 	{String} 					ID 				TextField ID.
 * @property 	{String} 					label 			TextField label.
 * @property 	{String} 					password 		State variable holding the password.
 * @property 	{SetStateActionString} 		setter 			Setter function for the state variable holding the text field value. 
 */

/**
 * @typedef {Dispatch<SetStateAction<string>>} SetStateActionString
 */

/**
 * @typedef {Dispatch<SetStateAction<number>>} SetStateActionNumber
 */

/**
 * @typedef {Dispatch<SetStateAction<boolean>>} SetStateActionBool
 */

/**
 * @typedef {Dispatch<SetStateAction<Date>>} SetStateActionDate
 */

/**
 * @typedef {Dispatch<SetStateAction<{
 * 		username: 		string;
 * 		firstName: 		string;
 * 		lastName: 		string;
 * 		email: 			string;
 * 		birthDate: 		Date;
 * 		displayName: 	string;
 * }>>} SetStateActionUser
 */

/**
 * @typedef {Dispatch<SetStateAction<{
 * 		username: 		boolean,
 * 		firstName: 		boolean,
 * 		lastName: 		boolean,
 * 		email: 			boolean,
 * 		birthDate: 		boolean,
 * 		displayName: 	boolean
 * }>>} SetStateActionTog
 */

/**
 * 
 * @typedef {Dispatch<SetStateAction<{
 * 		socket: 	Socket,
 * 		username: 	string,
 * 		room: 		boolean,
 * }>>} SetStateActionChatRoom
 */

/**
 * @typedef {Dispatch<SetStateAction<{
 * 		bannerURL: string;
 * 		description: string;
 * 		groupPage: boolean;
 * 		pageID: number;
 * 		pageTitle: string;
 * 		posts: any[];
 * 		private: boolean;
 * }>>} SetStateActionPage
 */


