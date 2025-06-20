import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { ActivityIndicator, Text, Card, Title, Paragraph } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const AnalysisScreen = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const analyzeFaces = async () => {
      try {
        const formData = new FormData();
        formData.append('person1', {
          uri: route.params.person1Uri,
          type: 'image/jpeg',
          name: 'person1.jpg',
        });
        formData.append('person2', {
          uri: route.params.person2Uri,
          type: 'image/jpeg',
          name: 'person2.jpg',
        });

        const response = await fetch('http://localhost:8000/compare-faces', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const data = await response.json();
        
        if (data.error) {
          setError(data.error);
        } else {
          setResults(data);
        }
      } catch (err) {
        setError('Failed to analyze faces. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    analyzeFaces();
  }, [route.params]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <ActivityIndicator size="large" color="#FF6B6B" />
          <Text style={styles.text}>Analyzing faces...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!results) {
    return null;
  }

  const renderMetric = (label, value1, value2) => (
    <View style={styles.metricRow}>
      <Text style={styles.metricLabel}>{label}</Text>
      <View style={styles.metricValues}>
        <Text style={styles.metricValue}>Person 1: {value1}</Text>
        <Text style={styles.metricValue}>Person 2: {value2}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Compatibility Analysis</Title>
            <Paragraph style={styles.compatibilityScore}>
              Overall Compatibility: {results.compatibility_score}%
            </Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Facial Features Analysis</Title>
            {renderMetric('Jawline Definition', results.person1_analysis.jawline_definition, results.person2_analysis.jawline_definition)}
            {renderMetric('Cheekbone Prominence', results.person1_analysis.cheekbone_prominence, results.person2_analysis.cheekbone_prominence)}
            {renderMetric('Skin Quality', results.person1_analysis.skin_quality, results.person2_analysis.skin_quality)}
            {renderMetric('Canthal Tilt', results.person1_analysis.canthal_tilt, results.person2_analysis.canthal_tilt)}
            {renderMetric('Eye Area Proportion', results.person1_analysis.eye_area_proportion, results.person2_analysis.eye_area_proportion)}
            {renderMetric('Facial Symmetry', results.person1_analysis.facial_symmetry, results.person2_analysis.facial_symmetry)}
            {renderMetric('Facial Harmony', results.person1_analysis.facial_harmony, results.person2_analysis.facial_harmony)}
            {renderMetric('Face Shape', results.person1_analysis.face_shape, results.person2_analysis.face_shape)}
            {renderMetric('Chin Projection', results.person1_analysis.chin_projection, results.person2_analysis.chin_projection)}
            {renderMetric('Lip Fullness', results.person1_analysis.lip_fullness, results.person2_analysis.lip_fullness)}
            {renderMetric('Nose Shape', results.person1_analysis.nose_shape, results.person2_analysis.nose_shape)}
            {renderMetric('Nose-to-Lip Ratio', results.person1_analysis.nose_to_lip_ratio, results.person2_analysis.nose_to_lip_ratio)}
            {renderMetric('Eyebrow Thickness/Position', results.person1_analysis.eyebrow_thickness_position, results.person2_analysis.eyebrow_thickness_position)}
            {renderMetric('Masculinity/Femininity Score', results.person1_analysis.masculinity_femininity_score, results.person2_analysis.masculinity_femininity_score)}
            {renderMetric('Eye Size and Spacing', results.person1_analysis.eye_size_spacing, results.person2_analysis.eye_size_spacing)}
            {renderMetric('Forehead Size', results.person1_analysis.forehead_size, results.person2_analysis.forehead_size)}
            {renderMetric('Midface Ratio', results.person1_analysis.midface_ratio, results.person2_analysis.midface_ratio)}
            {renderMetric('Lower Third Ratio', results.person1_analysis.lower_third_ratio, results.person2_analysis.lower_third_ratio)}
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    margin: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  compatibilityScore: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
    textAlign: 'center',
    marginVertical: 16,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  metricLabel: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  metricValues: {
    flex: 2,
  },
  metricValue: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
});

export default AnalysisScreen; 