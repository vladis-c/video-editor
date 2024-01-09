import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesome5} from '@expo/vector-icons';
import {TABS_NAV, TabNavParamList} from './navigation';
import FirstScreen from '../screens/FirstScreen';

const Tab = createBottomTabNavigator<TabNavParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={TABS_NAV.MAIN}
        component={FirstScreen}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="wallet" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
