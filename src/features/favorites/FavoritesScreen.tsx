import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, IconButton, Title } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { removeFromFavorites } from '../../store/favoritesSlice';
import { Recipe } from '../../types/Recipe';
import { useNavigation } from '@react-navigation/native';

const FavoritesScreen = () => {
  const favorites = useSelector((state: RootState) => state.favorites);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: Recipe }) => (
    <Card
      style={styles.card}
      onPress={() => (navigation as any).navigate('RecipeDetail', { recipeId: item.id })}
    >
      <Card.Content>
        <Title>{item.result.split('\n')[0]}</Title>
        <Text>{item.ingredients.join(', ')}</Text>
        <Text style={styles.date}>
          {new Date(item.createdAt).toLocaleDateString('tr-TR')}
        </Text>
        <IconButton
          icon="heart-off"
          size={24}
          onPress={() => dispatch(removeFromFavorites(item.id))}
        />
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Favori Tarifler</Title>
      {favorites.length === 0 ? (
        <Text>Henüz favori tarifiniz yok.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  date: {
    color: '#888',
    fontSize: 12,
    marginVertical: 6,
  },
  title: {
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default FavoritesScreen;