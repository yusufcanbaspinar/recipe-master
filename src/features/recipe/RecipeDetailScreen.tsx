import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Title, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite, Recipe } from '../../store/favoritesSlice';
import { RootState } from '../../store';

const RecipeDetailScreen = ({ route }: any) => {
  const { recipe } = route.params;
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const isFavorite = favorites.some((item: Recipe) => item.title === recipe.title);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(recipe.title));
    } else {
      dispatch(addFavorite(recipe));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>{recipe.title}</Title>
      {/* Açıklama başlığın hemen altında */}
      <Text style={styles.label}>Açıklama:</Text>
      <Text style={styles.description}>{recipe.description}</Text>
      <Text style={styles.label}>Malzemeler:</Text>
      {recipe.ingredients.map((item: string, idx: number) => (
        <Text key={idx}>• {item}</Text>
      ))}
      <Text style={styles.label}>Adımlar:</Text>
      {recipe.steps.map((step: string, idx: number) => (
        <Text key={idx}>{idx + 1}. {step}</Text>
      ))}
      <Button
        mode={isFavorite ? "outlined" : "contained"}
        style={styles.favBtn}
        onPress={handleToggleFavorite}
        icon={isFavorite ? "heart" : "heart-outline"}
      >
        {isFavorite ? "Favorilerden Çıkar" : "Favorilere Ekle"}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 8,
    marginTop: 8,
  },
  label: {
    marginTop: 14,
    fontWeight: 'bold',
  },
  description: {
    marginBottom: 8,
  },
  favBtn: {
    marginTop: 28,
  },
});

export default RecipeDetailScreen;