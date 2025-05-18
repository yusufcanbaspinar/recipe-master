import React from 'react';
import MainNavigator from './src/navigation/MainNavigator';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <MainNavigator />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}