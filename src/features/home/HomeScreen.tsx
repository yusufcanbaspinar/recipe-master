import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const HomeScreen = () => {
  // Tip güvenli navigation (daha sonra parametre tiplerini özelleştirebiliriz)
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View style={styles.container}>
      {/* Üst bölüm - sıcak karşılama */}
      <Text variant="titleLarge" style={styles.welcomeText}>
        Hoş geldin! Bugün ne pişirmek istersin?
      </Text>

      {/* Tarif hazırla butonu */}
      <Button
        mode="contained"
        style={styles.recipeButton}
        onPress={() => navigation.navigate('Recipe')}
      >
        Tarif Hazırla
      </Button>

      {/* Geçmiş tarifler */}
      <Title style={styles.sectionTitle}>Geçmiş Tarifler</Title>
      {/* Burada geçmiş tarif kartları (dummy) */}
      <Card style={styles.recipeCard}>
        <Card.Content>
          <Title>Kremalı Makarna</Title>
          <Text variant="bodyMedium">15 Mayıs 2025</Text>
        </Card.Content>
      </Card>
      {/* “Daha fazla tarif” gibi bir link eklenebilir */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFF',
  },
  welcomeText: {
    marginBottom: 24,
    fontWeight: 'bold',
  },
  recipeButton: {
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 8,
    marginTop: 16,
  },
  recipeCard: {
    marginBottom: 12,
  },
});

export default HomeScreen;