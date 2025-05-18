import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Title, Button, List, Divider, Avatar, Switch } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { clearHistory } from '../../store/historySlice';
import { clearFavorites } from '../../store/favoritesSlice';

const ProfileScreen = () => {
  // Basit şekilde “Karanlık Mod” takibi örneği (ileride genişletebiliriz)
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dispatch = useDispatch();

  const handleClearHistory = () => {
    Alert.alert(
      "Geçmişi Temizle",
      "Tüm geçmiş tarifler silinsin mi?",
      [
        { text: "İptal", style: "cancel" },
        { text: "Evet", onPress: () => dispatch(clearHistory()) }
      ]
    );
  };

  const handleClearFavorites = () => {
    Alert.alert(
      "Favorileri Temizle",
      "Tüm favori tarifler silinsin mi?",
      [
        { text: "İptal", style: "cancel" },
        { text: "Evet", onPress: () => dispatch(clearFavorites()) }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Avatar.Icon size={72} icon="account" />
        <Title style={styles.userName}>Misafir Kullanıcı</Title>
      </View>
      <Divider style={{ marginVertical: 12 }} />

      <List.Section>
        <List.Item
          title="Karanlık Mod"
          left={() => <List.Icon icon="theme-light-dark" />}
          right={() => (
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              disabled
            />
          )}
          description="(Yakında)"
        />
        <List.Item
          title="Uygulama Dili"
          left={() => <List.Icon icon="translate" />}
          right={() => <Text style={{ alignSelf: 'center' }}>Türkçe</Text>}
          description="Çoklu dil desteği yakında"
        />
      </List.Section>

      <Divider style={{ marginVertical: 12 }} />

      <Button
        mode="outlined"
        icon="delete"
        onPress={handleClearHistory}
        style={styles.button}
      >
        Geçmişi Temizle
      </Button>
      <Button
        mode="outlined"
        icon="heart-off"
        onPress={handleClearFavorites}
        style={styles.button}
      >
        Favorileri Temizle
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 8,
  },
  userName: {
    marginTop: 8,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 12,
  },
});

export default ProfileScreen;