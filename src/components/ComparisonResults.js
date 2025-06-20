import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Text, ProgressBar } from 'react-native-paper';

const ComparisonResults = ({ analysis }) => {
  if (!analysis) return null;

  return (
    <Surface style={styles.container}>
      <Text style={styles.title}>Compatibility Analysis</Text>
      
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>
          Overall Score: {analysis.score}%
        </Text>
        <ProgressBar
          progress={analysis.score / 100}
          style={styles.progressBar}
        />
      </View>

      {analysis.details && (
        <View style={styles.detailsContainer}>
          <Text style={styles.subtitle}>Detailed Analysis:</Text>
          {Object.entries(analysis.details).map(([category, value]) => (
            <View key={category} style={styles.detailItem}>
              <Text style={styles.detailText}>
                {category}: {value}
              </Text>
            </View>
          ))}
        </View>
      )}
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 10,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scoreContainer: {
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 18,
    marginBottom: 8,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
  detailsContainer: {
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailItem: {
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
  },
});

export default ComparisonResults; 