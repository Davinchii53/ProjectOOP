import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PreferencesScreen() {
  const navigation = useNavigation<any>();
  const [difficulty, setDifficulty] = useState('medium');
  const [dietary, setDietary] = useState('halal');
  const [cuisine, setCuisine] = useState('');

  const handleGenerateRecipe = () => {
    alert(
      `Generating recipe with:\nDifficulty: ${difficulty}\nDietary: ${dietary}\nCuisine: ${cuisine}`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.btnBack}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.btnEdit}>✏️ Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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

        <TouchableOpacity
          style={styles.btnGenerate}
          onPress={handleGenerateRecipe}
        >
          <Text style={styles.btnGenerateText}>Generate Recipe ✨</Text>
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
  btnEdit: {
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
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
});
