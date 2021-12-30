import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Chat from './chatroom/Chat';
import {SocketContext, socket} from './context/socket.js';
import reportWebVitals from './reportWebVitals';
import * as router from 'react-router-dom';

ReactDOM.render(
	<SocketContext.Provider value={socket}>
		<React.StrictMode>
			<router.BrowserRouter>
				<router.Routes>
					<router.Route path="/" element={<App />}/>
					<router.Route path="chatroom" element={<Chat />}/>
				</router.Routes>
			</router.BrowserRouter>
		</React.StrictMode>,
	</SocketContext.Provider>
 	document.getElementById('root')
);

reportWebVitals();
