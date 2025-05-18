import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Title, IconButton, Button } from 'react-native-paper';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addToFavorites, removeFromFavorites } from '../../store/favoritesSlice';
import { Recipe } from '../../types/Recipe';

type RecipeDetailParams = {
  RecipeDetail: {
    recipeId: string;
  };
};

const RecipeDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RecipeDetailParams, 'RecipeDetail'>>();
  const { recipeId } = route.params;

  // Hem favorilerde hem geçmişte arayalım:
  const recipe: Recipe | undefined = useSelector((state: RootState) =>
    state.history.find((r) => r.id === recipeId) ||
    state.favorites.find((r) => r.id === recipeId)
  );
  const isFavorite = useSelector((state: RootState) =>
    state.favorites.some((r) => r.id === recipeId)
  );
  const dispatch = useDispatch();

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text>Tarif bulunamadı.</Text>
      </View>
    );
  }

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(recipe.id));
    } else {
      dispatch(addToFavorites(recipe));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Tarif Detayı</Title>
          <Text style={styles.label}>Malzemeler:</Text>
          <Text style={styles.content}>{recipe.ingredients.join(', ')}</Text>
          {recipe.feature && (
            <>
              <Text style={styles.label}>Özellik/Not:</Text>
              <Text style={styles.content}>{recipe.feature}</Text>
            </>
          )}
          <Text style={styles.label}>Oluşturulma Tarihi:</Text>
          <Text style={styles.content}>
            {new Date(recipe.createdAt).toLocaleString('tr-TR')}
          </Text>
          <Text style={styles.label}>Tarif Açıklaması:</Text>
          <Text style={styles.content}>{recipe.result}</Text>

          <View style={styles.actions}>
            <IconButton
              icon={isFavorite ? 'heart' : 'heart-outline'}
              iconColor={isFavorite ? 'red' : undefined}
              size={28}
              onPress={handleFavorite}
            />
            <Button
              icon="share-variant"
              mode="text"
              onPress={() => {/* paylaşım fonksiyonu ileride eklenebilir */}}
            >
              Paylaş
            </Button>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  card: {
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 4,
  },
  content: {
    marginBottom: 4,
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default RecipeDetailScreen;