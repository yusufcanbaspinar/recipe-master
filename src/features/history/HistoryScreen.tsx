import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { clearHistory } from '../../store/historySlice';
import { SafeAreaView } from 'react-native-safe-area-context';

const HistoryScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const history = useSelector((state: RootState) => state.history.items);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Geçmiş Tarifler</Text>
        <TouchableOpacity onPress={() => dispatch(clearHistory())}>
          <Text style={styles.clearBtn}>Geçmişi Temizle</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {history.length === 0 && (
          <Text style={styles.emptyText}>Henüz geçmiş tarif yok.</Text>
        )}
        {history.map((recipe, idx) => (
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 10,
    backgroundColor: '#F7F8FA',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    letterSpacing: 0.3,
    textAlign: 'left',
  },
  clearBtn: {
    fontSize: 15,
    color: '#6c63ff',
    fontWeight: '600',
    padding: 6,
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

export default HistoryScreen;