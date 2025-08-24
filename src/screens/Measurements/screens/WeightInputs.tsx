import React, { useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import { launchCamera, launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import InputField from '../components/InputField';

type Props = {
  weight: string;
  setWeight: (val: string) => void;
  photoUri: string | null;
  setPhotoUri: (uri: string | null) => void;
};

const WeightInputs: React.FC<Props> = ({ weight, setWeight, photoUri, setPhotoUri }) => {
  // ✅ Request camera + storage permissions on Android
  const requestPermissions = useCallback(async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]);
        return (
          granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
        );
      } catch (err) {
        console.warn('Permission request error:', err);
        return false;
      }
    }
    return true;
  }, []);

  const handleCamera = async () => {
    const ok = await requestPermissions();
    if (!ok) {
      Alert.alert('Permission denied', 'Please allow camera and storage access.');
      return;
    }

    launchCamera(
      { mediaType: 'photo', saveToPhotos: true, quality: 0.8 },
      (response: ImagePickerResponse) => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          console.log('Camera error:', response.errorMessage);
        } else if (response.assets?.length) {
          setPhotoUri(response.assets[0].uri ?? null);
        }
      }
    );
  };

  const handleGallery = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled gallery');
      } else if (response.errorCode) {
        console.log('Gallery error:', response.errorMessage);
      } else if (response.assets?.length) {
        setPhotoUri(response.assets[0].uri ?? null);
      }
    });
  };

  return (
    <View>
      <InputField
        label="Enter Weight (kg)"
        placeholder="e.g. 72.5"
        value={weight}
        onChangeText={setWeight}
      />

      {photoUri ? (
        <Image source={{ uri: photoUri }} style={styles.preview} />
      ) : (
        <Text style={styles.noImage}>No photo uploaded</Text>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={handleCamera}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleGallery}>
          <Text style={styles.buttonText}>Choose from Gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  preview: { width: '100%', height: 200, borderRadius: 8, marginVertical: 12 },
  noImage: { textAlign: 'center', color: '#666', marginVertical: 12 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 },
  button: {
    flex: 1,
    backgroundColor: '#00827E',
    padding: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '600' },
});

export default WeightInputs;
