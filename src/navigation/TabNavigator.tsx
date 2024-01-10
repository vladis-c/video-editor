import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import {TABS_NAV, TabNavParamList} from './navigation';
import CompressScreen from '../screens/CompressScreen';
import TrimScreen from '../screens/TrimScreen';

const Tab = createBottomTabNavigator<TabNavParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={TABS_NAV.COMPRESS}
        component={CompressScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="compress" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={TABS_NAV.TRIM}
        component={TrimScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="scissors-cutting"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
