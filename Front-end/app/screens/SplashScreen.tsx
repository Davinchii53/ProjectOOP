import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type SplashNavigationProp = NativeStackNavigationProp<any>;

export default function SplashScreen() {
  const navigation = useNavigation<SplashNavigationProp>();

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800' }}
      style={styles.container}
      imageStyle={{ opacity: 0.7 }}
    >
      <View style={styles.contentWrapper}>
        <View style={styles.content}>
          <Text style={styles.title}>DishApp</Text>
          <Text style={styles.subtitle}>
            From ingredients to ideas{'\n'}AI helps you build better, balanced meals
          </Text>
          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={() => navigation.navigate('Upload')}
            activeOpacity={0.85}
          >
            <Text style={styles.btnPrimaryText}>Get Started</Text>
          </TouchableOpacity>
          <Text style={styles.footer}>No account required. Just tap and explore.</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    paddingVertical: 48,
    paddingHorizontal: 32,
    width: '85%',
    maxWidth: 320,
  },
  title: {
    fontSize: 42,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 32,
    lineHeight: 24,
    textAlign: 'center',
  },
  btnPrimary: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  btnPrimaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    marginTop: 24,
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
});
