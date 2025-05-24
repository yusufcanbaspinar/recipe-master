import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Title, Button, List, Divider, Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { clearHistory } from '../../store/historySlice';
import { clearFavorites } from '../../store/favoritesSlice';
import { RootState } from '../../store';
import { clearUser } from '../../store/userSlice';

const ProfileScreen = ({ setIsAuthenticated }: { setIsAuthenticated: (val: boolean) => void }) => {
  const dispatch = useDispatch();
  const userContact = useSelector((state: RootState) => state.user.contact);

  const handleClearHistory = () => {
    // ... (alert fonksiyonu)
  };

  const handleClearFavorites = () => {
    // ... (alert fonksiyonu)
  };

  const handleLogout = () => {
    // ... (alert fonksiyonu)
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <Avatar.Icon size={84} icon="account" />
          <Title style={styles.userName}>
            {userContact ? userContact : 'Misafir Kullanıcı'}
          </Title>
        </View>
        <Divider style={{ marginVertical: 20 }} />

        <List.Section style={styles.listSection}>
          <List.Item
            title="Uygulama Dili"
            left={() => <List.Icon icon="translate" />}
            right={() => <Text style={{ alignSelf: 'center' }}>Türkçe</Text>}
            description="Çoklu dil desteği yakında"
          />
        </List.Section>

        <Divider style={{ marginVertical: 16 }} />

        <Button
          mode="outlined"
          icon="delete"
          onPress={handleClearHistory}
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          Geçmişi Temizle
        </Button>
        <Button
          mode="outlined"
          icon="heart-off"
          onPress={handleClearFavorites}
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          Favorileri Temizle
        </Button>
        <Button
          mode="contained"
          icon="logout"
          onPress={handleLogout}
          style={styles.logoutButton}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          Çıkış Yap
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 30,
    paddingBottom: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  userName: {
    marginTop: 14,
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 0.5,
  },
  listSection: {
    marginBottom: 4,
    backgroundColor: 'transparent',
  },
  button: {
    marginTop: 14,
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: '#a3a3a3',
    overflow: 'hidden',
  },
  logoutButton: {
    marginTop: 22,
    borderRadius: 18,
    minHeight: 50,
    justifyContent: 'center',
  },
  buttonContent: {
    height: 48,
  },
  buttonLabel: {
    fontSize: 16,
  },
});

export default ProfileScreen;