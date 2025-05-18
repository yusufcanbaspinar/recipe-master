import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Text, TextInput, Button, Title } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { setUserContact } from '../../store/userSlice';

const FAKE_CODE = '123456'; // Simülasyon, gerçek API ile değişecek

const VerificationScreen = ({
  loginContact,
  setIsAuthenticated,
}: {
  loginContact: string;
  setIsAuthenticated: (val: boolean) => void;
}) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (code === FAKE_CODE) {
        dispatch(setUserContact(loginContact));
        setIsAuthenticated(true);
      } else {
        setError('Kod hatalı, lütfen tekrar deneyin.');
      }
    }, 1000);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Title style={styles.title}>Doğrulama</Title>
      <Text style={styles.subtitle}>
        {loginContact.includes('@')
          ? `E-posta adresinize`
          : `Telefon numaranıza`}
        {' '}
        gönderilen doğrulama kodunu giriniz.
      </Text>
      <TextInput
        label="Doğrulama Kodu"
        value={code}
        onChangeText={setCode}
        style={styles.input}
        keyboardType="number-pad"
        maxLength={6}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button
        mode="contained"
        onPress={handleVerify}
        loading={loading}
        disabled={!code || loading}
        style={styles.button}
      >
        Giriş Yap
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
    marginBottom: 24,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 16,
    color: '#444',
  },
  input: {
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    marginVertical: 16,
  },
  error: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default VerificationScreen;