import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Camera } from 'expo-camera';
import { Button, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      navigation.navigate('Home', { photo });
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        ref={(ref) => setCamera(ref)}
        style={styles.camera}
        type={Camera.Constants.Type.front}
      >
        <View style={styles.buttonContainer}>
          <IconButton
            icon="close"
            size={30}
            iconColor="white"
            onPress={() => navigation.goBack()}
            style={styles.closeButton}
          />
          <IconButton
            icon="camera"
            size={40}
            iconColor="white"
            onPress={takePicture}
            style={styles.captureButton}
          />
        </View>
      </Camera>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 40,
  },
  closeButton: {
    position: 'absolute',
    left: 20,
    bottom: 0,
  },
  captureButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});

export default CameraScreen; 