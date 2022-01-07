import { Dispatch, SetStateAction } from "react";
import { Socket } from "socket.io-client";

/**
 * @typedef {object} 	User		The Array for a User. Does not include the password or userID.
 * @property {string} 	username	
 * @property {string} 	firstName
 * @property {string} 	lastName
 * @property {Date} 	birthDate
 * @property {string}	displayName
 */

/**
 * @typedef {object} 	Toggle		The Array for which variable of the User Array are we trying to update
 * @property {boolean} 	username 
 * @property {boolean} 	firstName
 * @property {boolean} 	lastName
 * @property {boolean} 	birthDate
 * @property {boolean}	displayName
 */

/**
 * @typedef {object}	PasswordCheck	The Array used to check if the two new password inputs are the same.
 * @property {string}	newPassword 
 * @property {string}	confirmPassword
 */

/**
 * @typedef {object} 	ChatRoom
 * @property {Socket}	socket
 * @property {string}	username 	the username of the current user.
 * @property {string}	room		the name of the room you are currently in.
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
 * 		displayName: string;
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


