import React from 'react';
import { YellowBox } from 'react-native';

// Avoid in app warnings in development environment
// due to websocket connections
YellowBox.ignoreWarnings(['Unrecognized WebSocket']);

import Routes from "./routes";

const App = () => <Routes />;

export default App;
