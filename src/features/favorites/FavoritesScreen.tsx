import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { SafeAreaView } from 'react-native-safe-area-context';

const FavoritesScreen = ({ navigation }: any) => {
  const favorites = useSelector((state: RootState) => state.favorites.items);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Text style={styles.header}>Favoriler</Text>
      <ScrollView contentContainerStyle={styles.container}>
        {favorites.length === 0 && (
          <Text style={styles.emptyText}>Henüz favori tarif yok.</Text>
        )}
        {favorites.map((recipe, idx) => (
          <Card
            key={recipe.title + idx}
            style={styles.card}
            onPress={() => navigation.navigate('RecipeDetail', { recipe })}
            elevation={5}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{recipe.title}</Text>
              <Text style={styles.cardDescription} numberOfLines={2}>
                {recipe.description}
              </Text>
            </View>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    letterSpacing: 0.3,
    textAlign: 'left',
    paddingTop: 12,
    paddingBottom: 10,
    paddingHorizontal: 18,
    backgroundColor: '#F7F8FA',
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    flexGrow: 1,
  },
  emptyText: {
    color: '#999',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
  card: {
    borderRadius: 16,
    marginBottom: 18,
    backgroundColor: '#fff',
    shadowColor: '#222',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 4,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
    color: '#2D2D2D',
  },
  cardDescription: {
    fontSize: 15,
    color: '#666',
  },
});

export default FavoritesScreen;