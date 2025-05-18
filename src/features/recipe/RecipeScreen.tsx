import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, TextInput, Chip, Title, ActivityIndicator, Card, IconButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { addToHistory } from '../../store/historySlice';
import { addToFavorites, removeFromFavorites } from '../../store/favoritesSlice';
import { Recipe } from '../../types/Recipe';

const allIngredients = ['Domates', 'Salatalık', 'Biber', 'Soğan', 'Peynir', 'Tavuk', 'Makarna', 'Patates'];

function generateId() {
  return Math.random().toString(36).substr(2, 9) + Date.now();
}

const RecipeScreen = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [extraFeature, setExtraFeature] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipeResult, setRecipeResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savedRecipe, setSavedRecipe] = useState<Recipe | null>(null);
  const [favorited, setFavorited] = useState(false);

  const dispatch = useDispatch();

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  // Dummy AI API
  const getRecipe = async () => {
    setLoading(true);
    setError(null);
    setRecipeResult(null);
    setSavedRecipe(null);
    setFavorited(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const result = `İşte AI destekli örnek tarif:
Malzemeler: ${selectedIngredients.join(', ')}
${extraFeature ? `Ekstra Özellik: ${extraFeature}` : ''}
Tarif: Malzemeleri doğrayın, karıştırın ve 20 dakika pişirin!`;

      setRecipeResult(result);

      const recipeObj: Recipe = {
        id: generateId(),
        ingredients: selectedIngredients,
        feature: extraFeature,
        createdAt: new Date().toISOString(),
        result,
      };

      dispatch(addToHistory(recipeObj));
      setSavedRecipe(recipeObj);
    } catch (e) {
      setError('Bir hata oluştu, lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = () => {
    if (savedRecipe && !favorited) {
      dispatch(addToFavorites(savedRecipe));
      setFavorited(true);
    } else if (savedRecipe && favorited) {
      dispatch(removeFromFavorites(savedRecipe.id));
      setFavorited(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Malzeme Seçimi</Title>
      <View style={styles.chipContainer}>
        {allIngredients.map((ingredient) => (
          <Chip
            key={ingredient}
            selected={selectedIngredients.includes(ingredient)}
            style={styles.chip}
            onPress={() => toggleIngredient(ingredient)}
          >
            {ingredient}
          </Chip>
        ))}
      </View>

      <TextInput
        label="Ekstra Özellik veya Not"
        value={extraFeature}
        onChangeText={setExtraFeature}
        mode="outlined"
        style={styles.input}
        placeholder="(örn: vegan, hızlı, az yağlı...)"
      />

      <Button
        mode="contained"
        style={styles.submitButton}
        onPress={getRecipe}
        disabled={selectedIngredients.length === 0 || loading}
      >
        Tarif Önerisi Al
      </Button>

      {loading && <ActivityIndicator animating={true} style={styles.loader} size="large" />}
      {error && <Text style={{ color: 'red', marginTop: 12 }}>{error}</Text>}

      {recipeResult && savedRecipe && (
        <Card style={styles.resultCard}>
          <Card.Content>
            <Text variant="bodyLarge">{recipeResult}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
              <IconButton
                icon={favorited ? 'heart' : 'heart-outline'}
                iconColor={favorited ? 'red' : undefined}
                size={24}
                onPress={handleFavorite}
              />
              <Text>{favorited ? 'Favorilere eklendi' : 'Favorilere ekle'}</Text>
            </View>
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  chip: {
    margin: 4,
  },
  input: {
    marginBottom: 24,
  },
  submitButton: {
    marginTop: 16,
  },
  loader: {
    marginTop: 24,
  },
  resultCard: {
    marginTop: 24,
    backgroundColor: '#fafafa',
  },
});

export default RecipeScreen;