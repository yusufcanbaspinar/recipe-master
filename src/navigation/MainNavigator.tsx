import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from '../features/home/HomeScreen';
import FavoritesScreen from '../features/favorites/FavoritesScreen';
import HistoryScreen from '../features/history/HistoryScreen';
import ProfileScreen from '../features/profile/ProfileScreen';
import RecipeScreen from '../features/recipe/RecipeScreen';
import RecipeDetailScreen from '../features/recipe/RecipeDetailScreen';
import LoginScreen from '../features/auth/LoginScreen';
import VerificationScreen from '../features/auth/VerificationScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: 'home' | 'heart' | 'history' | 'account' = 'home';

          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Favorites') iconName = 'heart';
          else if (route.name === 'History') iconName = 'history';
          else if (route.name === 'Profile') iconName = 'account';

          return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Anasayfa' }} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favoriler' }} />
      <Tab.Screen name="History" component={HistoryScreen} options={{ title: 'Geçmiş' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
    </Tab.Navigator>
  );
}

const MainNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginContact, setLoginContact] = useState('');

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} setLoginContact={setLoginContact} />}
            </Stack.Screen>
            <Stack.Screen name="Verification">
            {(props) => (
              <VerificationScreen
                {...props}
                loginContact={loginContact}
                setIsAuthenticated={setIsAuthenticated}
              />
            )}
          </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="Recipe" component={RecipeScreen} options={{ headerShown: true, title: 'Tarif Hazırla' }} />
            <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} options={{ headerShown: true, title: 'Tarif Detayı' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;