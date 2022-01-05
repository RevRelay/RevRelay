import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as router from 'react-router-dom';

ReactDOM.render(
	<React.StrictMode>
		<router.BrowserRouter>
			<App />
		</router.BrowserRouter>
	</React.StrictMode>,
 	document.getElementById('root')
);


reportWebVitals();
