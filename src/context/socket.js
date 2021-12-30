import io from 'socket.io-client';
import config from '../config.json';

export const socket = io.connect(`${config["URL"]}:${config["SOCKET_PORT"]}`);
export const SocketContext = React.createContext();
