import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Text, TextInput, Button, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

function isEmailOrPhone(value: string) {
  const emailPattern = /^\S+@\S+\.\S+$/;
  const phonePattern = /^[0-9]{10,15}$/;
  return emailPattern.test(value) || phonePattern.test(value.replace(/[\s\-\(\)]/g, ''));
}

const LoginScreen = ({ setLoginContact }: { setLoginContact: (contact: string) => void }) => {
  const navigation = useNavigation<any>();
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (!isEmailOrPhone(contact)) {
      setError('Geçerli bir e-posta adresi veya telefon numarası giriniz.');
      return;
    }
    setError('');
    setLoginContact(contact);
    // navigation.navigate fonksiyonunu parametresiz kullan
    navigation.navigate('Verification');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Title style={styles.title}>Giriş / Kayıt</Title>
      <TextInput
        label="E-posta veya Telefon"
        value={contact}
        onChangeText={setContact}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button
        mode="contained"
        onPress={handleContinue}
        disabled={!contact}
        style={styles.button}
      >
        Devam Et
      </Button>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginVertical: 16,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
});

export default LoginScreen;