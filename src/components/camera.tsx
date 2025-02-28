import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { detectFridgeItems } from '@/api/scanner';

import { Button } from './ui';

export default function CameraComponent() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [items, setItems] = useState<{ label: string; probability: number }[]>(
    []
  );
  const [camera, setCamera] = useState<boolean>(true);
  const [flash, setFlash] = useState<boolean>(false);
  const [cameraType, setCameraType] = useState<'front' | 'back'>('back');

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await (cameraRef.current as any).takePictureAsync({
        quality: 1,
        skipProcessing: true,
      });
      uploadImage(photo.uri);
    }
  };

  const uploadImage = async (uri: string) => {
    try {
      const labels = await detectFridgeItems(uri);
      setCamera(false);
      setItems(labels);
    } catch (error) {
      console.error('Error detecting items:', error);
    }
  };

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
  };

  const flipCamera = () => {
    setCameraType(cameraType === 'back' ? 'front' : 'back');
  };

  const toggleFlash = () => {
    setFlash(!flash);
  };

  const takeNewPhoto = () => {
    setCamera(true);
    setItems([]);
  };

  if (!permission) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="mb-6 text-center text-white">
          We need your permission to access the camera
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="rounded-full bg-yellow-400 px-6 py-3"
        >
          <Text className="font-bold text-black">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <View className="flex-1">
      {camera ? (
        <View className="flex-1">
          <CameraView
            className="flex-1"
            facing={cameraType}
            ref={cameraRef}
            // @ts-ignore
            flashMode={flash ? 'on' : 'off'}
          >
            <View className="-mb-16 h-full"></View>
            <View className="mb-16 flex-1 justify-between">
              <View className="flex-row items-center justify-between px-4">
                <TouchableOpacity
                  onPress={toggleFlash}
                  className="size-12 items-center justify-center rounded-full"
                >
                  <Ionicons
                    name={flash ? 'flash' : 'flash-off'}
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={flipCamera}
                  className="size-12 items-center justify-center rounded-full"
                >
                  <MaterialIcons
                    name="flip-camera-ios"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
              <View className="pb-8">
                <View className="mb-4 flex-row items-center justify-around px-4">
                  <TouchableOpacity
                    onPress={selectImage}
                    className="bg-opacity-/60 size-14 items-center justify-center rounded-full bg-gray-800"
                  >
                    <MaterialIcons
                      name="photo-library"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={takePicture}
                    className="size-20 items-center justify-center rounded-full border-4 border-white"
                  >
                    <View className="size-16 rounded-full bg-white"></View>
                  </TouchableOpacity>
                  <View className="size-14"></View>
                </View>
              </View>
            </View>
          </CameraView>
        </View>
      ) : (
        <ScrollView className="flex-1">
          <View className="mt-4 w-full flex-1 items-start gap-2 rounded-t-3xl bg-white px-6 py-8">
            <Text className="text-2xl font-bold text-gray-800">
              Your Ingredients
            </Text>
            {items.length > 0 ? (
              <View className="mt-4 w-full gap-3">
                {items
                  .filter(
                    (item: { probability: number }) => item.probability > 0.5
                  )
                  .map((item, index) => (
                    <View
                      key={index.toString()}
                      className="flex-row items-center justify-between rounded-xl bg-gray-100 p-3"
                    >
                      <View className="flex-row items-center">
                        <View className="mr-3 size-8 items-center justify-center rounded-full bg-orange-400">
                          <FontAwesome name="cutlery" size={16} color="white" />
                        </View>
                        <Text className="font-medium text-gray-800">
                          {item.label}
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <Text className="mr-3 text-sm text-gray-500">
                          {(item.probability * 100).toFixed(0)}%
                        </Text>
                        <TouchableOpacity onPress={() => removeItem(index)}>
                          <Ionicons
                            name="close-circle"
                            size={24}
                            color="#FF4D4F"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
              </View>
            ) : (
              <View className="w-full items-center justify-center py-8">
                <Ionicons name="search-outline" size={48} color="#CCCCCC" />
                <Text className="mt-3 text-gray-400">
                  No ingredients detected
                </Text>
              </View>
            )}
            <View className="mt-auto w-full pt-4">
              <Button onPress={takeNewPhoto} className="mb-3" variant="outline">
                <Text>Scan Again</Text>
              </Button>
              <Button
                onPress={takeNewPhoto}
                className="mb-3"
                variant="secondary"
              >
                <Text>Confirm</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
