import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

export default function UploadScreen() {
  const navigation = useNavigation<any>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async (source: 'camera' | 'gallery') => {
    try {
      const result =
        source === 'camera'
          ? await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            })
          : await ImagePicker.launchImageLibraryAsync({
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        // Simulate ingredient detection
        setTimeout(() => {
          navigation.navigate('Detected', {
            image: result.assets[0].uri,
          });
        }, 500);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.btnBack}>←</Text>
        </TouchableOpacity>
        <View />
      </View>

      <View style={styles.content}>
        <Text style={styles.pageTitle}>What's on the menu for today? 😊</Text>
        <Text style={styles.pageSubtitle}>
          Upload ingredients or select preferences to get personalized recipes.
        </Text>

        <View style={styles.uploadSection}>
          <Text style={styles.uploadIcon}>📸</Text>
          <Text style={styles.uploadTitle}>Scan your ingredients:</Text>
          <Text style={styles.uploadDescription}>
            Take a photo or select from gallery to automatically detect your
            ingredients
          </Text>

          <View style={styles.uploadButtons}>
            <TouchableOpacity
              style={styles.btnUpload}
              onPress={() => pickImage('camera')}
            >
              <Text style={styles.uploadBtnText}>📷 Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnUpload}
              onPress={() => pickImage('gallery')}
            >
              <Text style={styles.uploadBtnText}>🖼️ Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
  pageTitle: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 12,
    lineHeight: 36,
  },
  pageSubtitle: {
    fontSize: 15,
    color: '#666666',
    marginBottom: 32,
  },
  uploadSection: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    paddingVertical: 48,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  uploadIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  uploadDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 24,
    textAlign: 'center',
  },
  uploadButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  btnUpload: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  uploadBtnText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
