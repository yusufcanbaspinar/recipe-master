import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../features/home/HomeScreen';
import FavoritesScreen from '../features/favorites/FavoritesScreen';
import HistoryScreen from '../features/history/HistoryScreen';
import ProfileScreen from '../features/profile/ProfileScreen';
import RecipeScreen from '../features/recipe/RecipeScreen';
import RecipeDetailScreen from '../features/recipe/RecipeDetailScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = '';
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Favorites') iconName = 'heart-outline';
          else if (route.name === 'History') iconName = 'history';
          else if (route.name === 'Profile') iconName = 'account-outline';
          return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: '#6c63ff',
        tabBarInactiveTintColor: '#777',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Anasayfa' }} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favoriler' }} />
      <Tab.Screen name="History" component={HistoryScreen} options={{ title: 'Geçmiş' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Recipe"
        component={RecipeScreen}
        options={{ title: 'Tarif Hazırla' }}
      />
      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{ title: 'Tarif Detayı' }}
      />
    </Stack.Navigator>
  );
}