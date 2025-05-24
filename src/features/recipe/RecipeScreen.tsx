import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Text, TextInput, Button, Title, Chip } from 'react-native-paper';
import { suggestRecipe } from '../../api/recipeApi';

const RecipeScreen = ({ navigation }: any) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [extra, setExtra] = useState('');
  const [servings, setServings] = useState('');
  const [calorieLimit, setCalorieLimit] = useState('');
  const [maxTime, setMaxTime] = useState('');
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<null | {
    title: string;
    ingredients: string[];
    steps: string[];
    description: string;
  }>(null);

  const handleAddIngredient = () => {
    if (inputValue.trim() && !ingredients.includes(inputValue.trim())) {
      setIngredients(prev => [...prev, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveIngredient = (item: string) => {
    setIngredients(prev => prev.filter(i => i !== item));
  };

  const handleSubmit = async () => {
    if (ingredients.length === 0) {
      Alert.alert("Malzeme giriniz", "En az bir malzeme eklemelisiniz.");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const payload: any = {
        ingredients,
        extra,
      };
      if (servings) payload.servings = Number(servings);
      if (calorieLimit) payload.calorie_limit = Number(calorieLimit);
      if (maxTime) payload.max_time = Number(maxTime);

      const data = await suggestRecipe(payload);
      setResult(data);
    } catch (e: any) {
      Alert.alert("Hata", "Tarif alınamadı. " + (e.response?.data?.detail || e.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title>Tarif Hazırla</Title>
      <TextInput
        label="Malzeme Ekle"
        value={inputValue}
        onChangeText={setInputValue}
        onSubmitEditing={handleAddIngredient}
        style={styles.input}
      />
      <Button mode="outlined" onPress={handleAddIngredient} style={styles.addBtn}>
        Malzeme Ekle
      </Button>
      <View style={styles.chipContainer}>
        {ingredients.map(item => (
          <Chip key={item} style={styles.chip} onClose={() => handleRemoveIngredient(item)}>
            {item}
          </Chip>
        ))}
      </View>
      <TextInput
        label="Ekstra İstekler (örn: fırında, düşük kalorili)"
        value={extra}
        onChangeText={setExtra}
        style={styles.input}
      />
      <TextInput
        label="Kaç Kişilik?"
        value={servings}
        onChangeText={setServings}
        style={styles.input}
        keyboardType="number-pad"
      />
      <TextInput
        label="Maksimum Kalori (isteğe bağlı)"
        value={calorieLimit}
        onChangeText={setCalorieLimit}
        style={styles.input}
        keyboardType="number-pad"
      />
      <TextInput
        label="Maksimum Süre (dakika, isteğe bağlı)"
        value={maxTime}
        onChangeText={setMaxTime}
        style={styles.input}
        keyboardType="number-pad"
      />
      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={loading}
        disabled={loading}
        style={styles.submitBtn}
      >
        Tarif Hazırla
      </Button>

      {loading && <ActivityIndicator size="large" style={{ marginTop: 24 }} />}
      {result && (
        <View style={styles.resultCard}>
          <Title>{result.title}</Title>
          <Text style={styles.resultLabel}>Malzemeler:</Text>
          {result.ingredients.map((item, idx) => (
            <Text key={idx}>• {item}</Text>
          ))}
          <Text style={styles.resultLabel}>Adımlar:</Text>
          {result.steps.map((step, idx) => (
            <Text key={idx}>{idx + 1}. {step}</Text>
          ))}
          <Text style={styles.resultLabel}>Açıklama:</Text>
          <Text>{result.description}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    marginVertical: 6,
  },
  addBtn: {
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 4,
    backgroundColor: '#eee',
  },
  submitBtn: {
    marginTop: 14,
  },
  resultCard: {
    marginTop: 28,
    padding: 18,
    backgroundColor: '#fafafc',
    borderRadius: 14,
    elevation: 1,
  },
  resultLabel: {
    marginTop: 12,
    fontWeight: 'bold',
  },
});

export default RecipeScreen;