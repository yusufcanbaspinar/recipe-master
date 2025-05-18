import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Title } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Recipe } from '../../types/Recipe';

const HistoryScreen = () => {
  const history = useSelector((state: RootState) => state.history);

  const renderItem = ({ item }: { item: Recipe }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.result.split('\n')[0]}</Title>
        <Text>{item.ingredients.join(', ')}</Text>
        <Text style={styles.date}>
          {new Date(item.createdAt).toLocaleDateString('tr-TR')}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Geçmiş Tarifler</Title>
      {history.length === 0 ? (
        <Text>Henüz oluşturduğunuz tarif yok.</Text>
      ) : (
        <FlatList
          data={history}
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

export default HistoryScreen;