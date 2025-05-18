import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
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

  const handleLogout = () => {
    Alert.alert(
      "Çıkış Yap",
      "Uygulamadan çıkış yapmak istiyor musunuz?",
      [
        { text: "İptal", style: "cancel" },
        {
          text: "Evet",
          onPress: () => {
            dispatch(clearUser());
            setIsAuthenticated(false);
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Avatar.Icon size={72} icon="account" />
        <Title style={styles.userName}>
          {userContact ? userContact : 'Misafir Kullanıcı'}
        </Title>
      </View>
      <Divider style={{ marginVertical: 12 }} />

      <List.Section>
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
      <Button
        mode="contained"
        icon="logout"
        onPress={handleLogout}
        style={styles.button}
      >
        Çıkış Yap
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