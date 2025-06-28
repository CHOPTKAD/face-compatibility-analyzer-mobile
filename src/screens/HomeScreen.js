import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const HomeScreen = ({ navigation }) => {
  const [yourPhoto, setYourPhoto] = useState(null);
  const [crushPhoto, setCrushPhoto] = useState(null);

  const pickImage = async (setImage) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAnalyze = () => {
    if (!yourPhoto || !crushPhoto) {
      alert('Please select both images first');
      return;
    }
    navigation.navigate('Analysis', { yourPhoto, crushPhoto });
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.imageBox}
          onPress={() => pickImage(setYourPhoto)}
        >
          {yourPhoto ? (
            <Image source={{ uri: yourPhoto }} style={styles.image} />
          ) : (
            <Text style={styles.label}>Your photo</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageBox}
          onPress={() => pickImage(setCrushPhoto)}
        >
          {crushPhoto ? (
            <Image source={{ uri: crushPhoto }} style={styles.image} />
          ) : (
            <Text style={styles.label}>Crush's photo</Text>
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.analyzeButton}
        onPress={handleAnalyze}
      >
        <Text style={styles.analyzeButtonLabel}>
          Analyze Compatibility
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 32,
  },
  imageBox: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  label: {
    color: '#222',
    fontSize: 18,
    fontWeight: 'bold',
  },
  analyzeButton: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#222',
    marginTop: 8,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  analyzeButtonLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;