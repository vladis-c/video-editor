import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {MAIN_NAV, MainNavParamList} from './navigation';
import TabNavigator from './TabNavigator';

const MainStack = createNativeStackNavigator<MainNavParamList>();

const MainNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MainStack.Screen
        name={MAIN_NAV.TABS_NAV}
        component={TabNavigator}
        options={{headerShown: false}}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
