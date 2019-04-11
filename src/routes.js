import { createAppContainer, createSwitchNavigator } from "react-native";

import Main from './pages/Main';
import Box from './pages/Box';

const Routes = createAppContainer(
	createSwitchNavigator({
		Main,
		Box
	})
);