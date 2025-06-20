import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Button, ProgressBar, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const ResultsScreen = ({ route, navigation }) => {
  const { compatibility, features } = route.params;

  const renderFeatureBar = (label, value) => (
    <View style={styles.featureContainer}>
      <Text style={styles.featureLabel}>{label}</Text>
      <View style={styles.progressContainer}>
        <ProgressBar
          progress={value / 100}
          color="#FF6B6B"
          style={styles.progressBar}
        />
        <Text style={styles.featureValue}>{value}%</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Surface style={styles.scoreContainer}>
          <Text style={styles.scoreTitle}>Compatibility Score</Text>
          <Text style={styles.scoreValue}>{compatibility}%</Text>
        </Surface>

        <Surface style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Detailed Analysis</Text>
          {renderFeatureBar('Facial Symmetry', features.facialSymmetry)}
          {renderFeatureBar('Facial Proportions', features.facialProportions)}
          {renderFeatureBar('Skin Tone', features.skinTone)}
          {renderFeatureBar('Facial Features', features.facialFeatures)}
        </Surface>

        <Button
          mode="contained"
          onPress={() => navigation.navigate('Home')}
          style={styles.button}
        >
          Start New Analysis
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  scoreContainer: {
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    borderRadius: 10,
    alignItems: 'center',
  },
  scoreTitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  featuresContainer: {
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    borderRadius: 10,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  featureContainer: {
    marginBottom: 15,
  },
  featureLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
  },
  featureValue: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  button: {
    marginVertical: 20,
  },
});

export default ResultsScreen; 