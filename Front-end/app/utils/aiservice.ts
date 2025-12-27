import axios from 'axios';
import { Recipe, RecipeResponse } from '../types/recipe';

// Base server URL
const BASE_URL = "https://api.ambasing.shop";

// Use HTTP for both development and production since the server doesn't support HTTPS
const getApiEndpoint = () => {
  return `${BASE_URL}/recipe`;
};

const getUploadEndpoint = () => {
  return `${BASE_URL}/upload-image/`;
};

const endpoint = getApiEndpoint();

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

// Configure axios for better emulator and APK compatibility
const apiClient = axios.create({
    baseURL: endpoint,
    timeout: 60000, // Increase timeout to 60 seconds for slower connections
    headers: headers,
    validateStatus: function (status) {
        return status >= 200 && status < 300;
    }
});

interface RecipeParams {
    diet: string;
    type: string;
    difficulty: string;
    ingredients: string;
}

// Upload image function
export async function uploadImage(image: any) {
  const formData = new FormData();

  formData.append('file', {
    uri: image.uri,
    name: image.fileName ?? 'photo.jpg',
    type: image.mimeType ?? 'image/jpeg',
  } as any);

  console.log('Uploading:', image.uri);

  const response = await fetch(`${BASE_URL}/upload-image/`, {
    method: 'POST',
    body: formData,
    //NO headers
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.status}`);
  }

  const json = await response.json();

  return json.data.content
    .split('\n')
    .map((l: string) => l.replace(/^\d+\.\s*/, '').trim()).filter((l: string) => l.length > 0);
}

export async function generateRecipe(
  params: RecipeParams
): Promise<any> {
  const response = await fetch(`${BASE_URL}/recipe/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Recipe API error ${response.status}: ${text}`
    );
  }

  const result = await response.json();
  return result.data; // matches {"data": result}
}

