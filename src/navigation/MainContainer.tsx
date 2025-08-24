import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MeasurementsScreen from '../screens/Measurements/screens/MeasurementsScreen';
import DietScreen from '../screens/DietScreen';
import AnalysisScreen from '../screens/AnalysisScreen';
import SettingsScreen from '../screens/SettingsScreen';

export type BottomTabParamList = {
  Measurements: undefined;
  Diet: undefined;
  Analysis: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const ICONS = {
  Measurements: ['speedometer-outline', 'speedometer'],
  Diet: ['restaurant-outline', 'restaurant'],
  Analysis: ['bar-chart-outline', 'bar-chart'],
  Settings: ['settings-outline', 'settings'],
};

const MainContainer: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Measurements"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const [outline, filled] = ICONS[route.name as keyof BottomTabParamList];
          return <Ionicons name={focused ? filled : outline} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'grey',
        tabBarLabelStyle: { paddingBottom: 5, fontSize: 12 },
        tabBarStyle: { height: 65, paddingVertical: 5 },
        headerShown: true, 
        headerTitleAlign: 'center',
        headerTitle: route.name, 
      })}
    >
      <Tab.Screen name="Measurements" component={MeasurementsScreen} />
      <Tab.Screen name="Diet" component={DietScreen} />
      <Tab.Screen name="Analysis" component={AnalysisScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default MainContainer;
