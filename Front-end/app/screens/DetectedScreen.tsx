import React from 'react';
import { Picker } from '@react-native-picker/picker';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function DetectedScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [difficulty, setDifficulty] = React.useState('');
  const [dietary, setDietary] = React.useState('');
  const [cuisine, setCuisine] = React.useState('');

  const sampleIngredients = ['Tomato', 'Onion', 'Garlic', 'Bell Pepper', 'Potato'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.btnBack}>←</Text>
        </TouchableOpacity>
        <View />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.successMessage}>
          <Text style={styles.successTitle}>Sweet! We've got your ingredients noted 📝</Text>
          <Text style={styles.successSubtitle}>
            Now let AI decide your menu recipe based on the available ingredients.
          </Text>
        </View>

        <View style={styles.detectedSection}>
          <Text style={styles.detectedTitle}>🔍 Detected Ingredients:</Text>
          <View style={styles.ingredientsList}>
            {sampleIngredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientTag}>
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={styles.btnEdit}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.btnEditText}>✏️ Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.preferencesSection}>
          <Text style={styles.sectionTitle}>🎯 Recipe Preferences:</Text>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>⚡ Difficulty level</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={difficulty}
                onValueChange={(itemValue) => setDifficulty(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Choose option..." value="" />
                <Picker.Item label="Easy" value="easy" />
                <Picker.Item label="Medium" value="medium" />
                <Picker.Item label="Hard" value="hard" />
              </Picker>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>🥗 Dietary Preference</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={dietary}
                onValueChange={(itemValue) => setDietary(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Choose option..." value="" />
                <Picker.Item label="None" value="none" />
                <Picker.Item label="Vegan" value="vegan" />
                <Picker.Item label="Vegetarian" value="vegetarian" />
                <Picker.Item label="Keto" value="keto" />
                <Picker.Item label="Halal" value="halal" />
                <Picker.Item label="Kosher" value="kosher" />
              </Picker>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>🍜 Cuisine Type</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={cuisine}
                onValueChange={(itemValue) => setCuisine(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Choose option..." value="" />
                <Picker.Item label="Western" value="western" />
                <Picker.Item label="Asian" value="asian" />
                <Picker.Item label="Indonesian" value="indonesian" />
                <Picker.Item label="Middle-Eastern" value="middle-eastern" />
              </Picker>
            </View>
          </View>
        </View>

        <TouchableOpacity style={[styles.btnGenerate, styles.btnGenerateActive]}>
          <Text style={styles.btnGenerateActiveText}>Generate Recipe ✨</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 24,
  },
  btnBack: {
    fontSize: 24,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  successMessage: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  detectedSection: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 24,
    marginBottom: 32,
  },
  detectedTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  ingredientsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  ingredientTag: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  ingredientText: {
    fontSize: 14,
    color: '#000000',
  },
  btnEdit: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  btnEditText: {
    fontSize: 14,
    fontWeight: '500',
  },
  preferencesSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 8,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  picker: {
    height: 50,
  },
  btnGenerate: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 32,
  },
  btnGenerateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  btnGenerateActive: {
    backgroundColor: '#000000',
  },
  btnGenerateActiveText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
