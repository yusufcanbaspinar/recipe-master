import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Title, Button, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const navigation = useNavigation();
  const history = useSelector((state: RootState) => state.history.items);

  const lastRecipes = history.slice(0, 3);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerBlock}>
          <Title style={styles.title}>Hoşgeldin!</Title>
          <Text style={styles.subtitle}>Bugün ne pişirmek istersin?</Text>
          <Button
            mode="contained"
            style={styles.recipeBtn}
            onPress={() => navigation.navigate('Recipe')}
          >
            Tarif Hazırla
          </Button>
        </View>

        <View style={styles.historyBlock}>
          <Text style={styles.sectionTitle}>Geçmiş Tarifler</Text>
          {lastRecipes.length === 0 && <Text style={styles.emptyText}>Henüz geçmiş tarif yok.</Text>}
          {lastRecipes.map((recipe, idx) => (
            <Card
              key={recipe.title + idx}
              style={styles.card}
              onPress={() => navigation.navigate('RecipeDetail', { recipe })}
            >
              <Card.Content>
                <Title style={{ fontSize: 16 }}>{recipe.title}</Title>
                <Text numberOfLines={2}>{recipe.description}</Text>
              </Card.Content>
            </Card>
          ))}
          {history.length > 3 && (
            <Button
              mode="text"
              style={styles.moreBtn}
              onPress={() => navigation.navigate('History')}
            >
              Daha fazla tarif +
            </Button>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 22,
    paddingTop: 34, // Başlığı aşağı alır, cihazdan cihaza safe-area uyumlu olur
    paddingBottom: 24,
  },
  headerBlock: {
    marginBottom: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 4,
    fontWeight: 'bold',
    fontSize: 24,
    alignSelf: 'center',
  },
  subtitle: {
    marginBottom: 16,
    fontSize: 16,
    color: '#666',
    alignSelf: 'center',
  },
  recipeBtn: {
    borderRadius: 18,
    alignSelf: 'center',
    width: 180,
    marginBottom: 2,
  },
  historyBlock: {
    marginTop: 12,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    marginLeft: 4,
  },
  card: {
    marginBottom: 10,
    borderRadius: 12,
    elevation: 2,
  },
  moreBtn: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  emptyText: {
    color: '#999',
    textAlign: 'center',
    marginTop: 14,
    fontSize: 15,
  },
});

export default HomeScreen;