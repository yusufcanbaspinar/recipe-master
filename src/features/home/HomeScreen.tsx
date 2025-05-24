import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, Card, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Üst bölüm - sıcak karşılama */}
        <Text variant="titleLarge" style={styles.welcomeText}>
          Hoş geldin! Bugün ne pişirmek istersin?
        </Text>

        {/* Tarif hazırla butonu */}
        <Button
          mode="contained"
          style={styles.recipeButton}
          contentStyle={styles.recipeButtonContent}
          labelStyle={styles.recipeButtonLabel}
          onPress={() => navigation.navigate('Recipe')}
        >
          Tarif Hazırla
        </Button>

        {/* Geçmiş tarifler */}
        <Title style={styles.sectionTitle}>Geçmiş Tarifler</Title>
        <Card style={styles.recipeCard}>
          <Card.Content>
            <Title>Kremalı Makarna</Title>
            <Text variant="bodyMedium">15 Mayıs 2025</Text>
          </Card.Content>
        </Card>
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
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  welcomeText: {
    marginBottom: 32,
    fontWeight: 'bold',
    fontSize: 22,
  },
  recipeButton: {
    marginBottom: 40,
    borderRadius: 20,
    alignSelf: 'stretch',
  },
  recipeButtonContent: {
    height: 48,
  },
  recipeButtonLabel: {
    fontSize: 18,
  },
  sectionTitle: {
    marginBottom: 12,
    marginTop: 8,
    fontWeight: '600',
    fontSize: 18,
  },
  recipeCard: {
    marginBottom: 16,
    borderRadius: 16,
    elevation: 2,
  },
});

export default HomeScreen;