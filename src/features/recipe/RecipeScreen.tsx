import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Text, TextInput, Button, Title, Chip } from 'react-native-paper';
import { suggestRecipe } from '../../api/recipeApi';
import { useDispatch } from 'react-redux';
import { addHistory } from '../../store/historySlice';

const RecipeScreen = ({ navigation }: any) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [extra, setExtra] = useState('');
  const [servings, setServings] = useState('');
  const [calorieLimit, setCalorieLimit] = useState('');
  const [maxTime, setMaxTime] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

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
      alert("En az bir malzeme eklemelisiniz.");
      return;
    }
    setLoading(true);
    try {
      const payload: any = {
        ingredients,
        extra,
      };
      if (servings) payload.servings = Number(servings);
      if (calorieLimit) payload.calorie_limit = Number(calorieLimit);
      if (maxTime) payload.max_time = Number(maxTime);

      const data = await suggestRecipe(payload);
      setLoading(false);

      dispatch(addHistory(data));
      navigation.navigate('RecipeDetail', { recipe: data });
    } catch (e: any) {
      setLoading(false);
      alert("Tarif alınamadı: " + (e.response?.data?.detail || e.message));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Title style={styles.title}>Tarif Hazırla</Title>
        <TextInput
          label="Malzeme Ekle"
          value={inputValue}
          onChangeText={setInputValue}
          onSubmitEditing={handleAddIngredient}
          style={styles.input}
          mode="outlined"
          returnKeyType="done"
        />
        <Button
          mode="contained-tonal"
          onPress={handleAddIngredient}
          style={styles.addBtn}
          icon="plus"
          contentStyle={{ flexDirection: 'row-reverse' }}
        >
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
          mode="outlined"
        />
        <TextInput
          label="Kaç Kişilik?"
          value={servings}
          onChangeText={setServings}
          style={styles.input}
          keyboardType="number-pad"
          mode="outlined"
        />
        <TextInput
          label="Maksimum Kalori (isteğe bağlı)"
          value={calorieLimit}
          onChangeText={setCalorieLimit}
          style={styles.input}
          keyboardType="number-pad"
          mode="outlined"
        />
        <TextInput
          label="Maksimum Süre (dakika, isteğe bağlı)"
          value={maxTime}
          onChangeText={setMaxTime}
          style={styles.input}
          keyboardType="number-pad"
          mode="outlined"
        />
        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={loading}
          disabled={loading}
          style={styles.submitBtn}
          contentStyle={{ paddingVertical: 8 }}
        >
          Tarif Hazırla
        </Button>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 22,
    backgroundColor: '#fff',
    flexGrow: 1,
    paddingBottom: 40,
  },
  title: {
    alignSelf: 'center',
    marginBottom: 12,
    fontWeight: 'bold',
    fontSize: 22,
  },
  input: {
    marginVertical: 7,
    backgroundColor: '#fafaff',
    borderRadius: 14,
  },
  addBtn: {
    alignSelf: 'flex-start',
    marginVertical: 4,
    borderRadius: 18,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    marginTop: 2,
    gap: 6,
  },
  chip: {
    marginRight: 7,
    marginBottom: 7,
    backgroundColor: '#eee',
    borderRadius: 14,
    fontSize: 16,
  },
  submitBtn: {
    marginTop: 20,
    borderRadius: 20,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default RecipeScreen;