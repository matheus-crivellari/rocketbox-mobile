import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Main from './pages/Main';
import Box from './pages/Box';

console.log(createSwitchNavigator);

const Routes = createAppContainer(
	createSwitchNavigator({
		Main,
		Box,
	})
);

export default Routes;