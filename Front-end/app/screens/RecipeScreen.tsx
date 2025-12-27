import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { generateRecipe } from '../utils/aiservice';
import { Recipe } from '../types/recipe';

export default function RecipePage({route}) {
  
  const navigation = useNavigation<any>();


  const {
    passedIngredients,
    passedDifficulty,
    passedDietary,
    passedCuisine,
  } = route.params;

  const [ingredients, setIngredients] = React.useState<string[]>([]);
  const [cookingTips, setCookingTips] = React.useState<string[]>([]);
  const [steps, setSteps] = React.useState<string[]>([]);

  const addIngredient = (item: string) => setIngredients((prev) => [...prev, item]);
  const addCookingTip = (tip: string) => setCookingTips((prev) => [...prev, tip]);
  const addSteps = (step: string) => setSteps((prev) => [...prev, step]);

  const [youtubeUrl, setYoutubeUrlState] = React.useState<string>("");
  const [name, setName] = React.useState<string>("Loading...");
  const [difficulty, setDifficulty] = React.useState<string>("Loading...");
  const [diet, setDiet] = React.useState<string>("Loading...");
  const [cuisine, setCuisine] = React.useState<string>("Loading...");
  const [prepTime, setPrepTime] = React.useState<string>("Loading...");
  const [cookTime, setCookTime] = React.useState<string>("Loading...");

  function setYoutubeVideo(url: string) {
    const embedUrl = url
      .replace("watch?v=", "embed/")
      .replace("youtu.be/", "www.youtube.com/embed/");
    setYoutubeUrlState(embedUrl);
  }
  
  React.useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const result = await generateRecipe({
          diet: passedDietary,
          type: passedCuisine,
          difficulty: passedDifficulty,
          ingredients: passedIngredients.join(', '),
        });
        
        // metadata
        setName(result.name);
        setDifficulty(result.difficulty);
        setDiet(result.diet);
        setCuisine(result.kind_of_food);
        setPrepTime(result.prep_time);
        setCookTime(result.cook_time);

        // ingredients
        result.ingredients.forEach((item) => {
          addIngredient(item);
        });

        // instructions
        result.steps.forEach((step) => {
          addSteps(step);
        });

        // tips (optional)
        result.tips?.forEach((tip) => {
          addCookingTip(tip);
        });

        // video (optional safety)
        if (result.video_data.length > 0) {
          setYoutubeVideo(result.video_data[0].url);
        }

      } catch (err) {
        console.error('NOT GENERATED', err);
      }
    };

    fetchRecipe();
  }, []);

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
    detailRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingVertical: 10,
  borderBottomWidth: 1,
  borderColor: '#E0E0E0',
},
detailLabel: {
  fontWeight: '500',
  color: '#555',
},
detailValue: {
  fontWeight: '500',
},
listItem: {
  fontSize: 14,
  color: '#444',
  marginBottom: 8,
},
stepRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 16,
},
stepNumber: {
  width: 36,
  height: 36,
  borderRadius: 18,
  backgroundColor: '#E0E0E0',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 12,
},
stepNumberText: {
  fontWeight: 'bold',
},
stepBox: {
  flex: 1,
  backgroundColor: '#F5F5F5',
  borderRadius: 10,
  padding: 12,
},
tipItem: {
  flexDirection: 'row',
  alignItems: 'flex-start',
  marginBottom: 10,
},
tipBullet: {
  fontSize: 18,
  marginRight: 8,
},
tipText: {
  flex: 1,
  fontSize: 14,
  color: '#444',
},
  });

  return (
  <ScrollView style={styles.container}>

    {/* HEADER */}
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.btnBack}>←</Text>
      </TouchableOpacity>

      <View style={{ flex: 1, alignItems: 'center', marginRight: 32 }}>
        <Text style={styles.successTitle}>{name}</Text>
        <Text style={styles.successSubtitle}>
          Your personalized recipe is ready!
        </Text>
      </View>
    </View>

    {/* RECIPE DETAILS */}
    <View style={styles.detectedSection}>
      <Text style={styles.detectedTitle}>📝 Recipe Details</Text>

      {[
        ['Name', name],
        ['Difficulty', difficulty],
        ['Diet', diet],
        ['Cuisine', cuisine],
        ['Prep Time', prepTime],
        ['Cook Time', cookTime],
      ].map(([label, value]) => (
        <View key={label} style={styles.detailRow}>
          <Text style={styles.detailLabel}>{label}:</Text>
          <Text style={styles.detailValue}>{value}</Text>
        </View>
      ))}
    </View>

    {/* INGREDIENTS */}
    <View style={styles.detectedSection}>
      <Text style={styles.detectedTitle}>🥕 Ingredients</Text>

      {ingredients.map((item, index) => (
       <Text key={index} style={styles.listItem}>
        • {item}
       </Text>
     ))}

    </View>

    {/* COOKING TIPS */}
      <View style={styles.detectedSection}>
        <Text style={styles.detectedTitle}>🍳 Cooking Tips</Text>

        {cookingTips.length === 0 ? (
          <Text style={{ color: '#888' }}>No cooking tips available.</Text>
        ) : (
          cookingTips.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))
        )}
      </View>


    {/* VIDEO */}
    <View style={styles.detectedSection}>
      <Text style={styles.detectedTitle}>🎥 Video Tutorial</Text>

      {youtubeUrl ? (
        <WebView
          source={{ uri: youtubeUrl }}
          style={{ height: 220, borderRadius: 12 }}
        />
      ) : (
        <View style={{ height: 220, backgroundColor: '#E0E0E0', borderRadius: 12 }} />
      )}
    </View>

    {/* STEPS */}
    <View style={styles.detectedSection}>
      <Text style={styles.detectedTitle}>👩🏻‍🍳 Cooking Steps</Text>

      {steps.map((step, index) => (
        <View key={index} style={styles.stepRow}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>{index + 1}</Text>
          </View>
          <View style={styles.stepBox}>
            <Text>{step}</Text>
          </View>
        </View>
      ))}
    </View>

  </ScrollView>
);

}
