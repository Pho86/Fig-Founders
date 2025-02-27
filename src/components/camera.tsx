import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useRef, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

import { detectFridgeItems } from '@/api/scanner';
import { Button } from '@/components/ui';

export default function CameraComponent() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [items, setItems] = useState<string[]>([]);
  const [camera, setCamera] = useState<boolean>(true);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await (cameraRef.current as any).takePictureAsync();
      uploadImage(photo.uri);
    }
  };

  const uploadImage = async (uri: string) => {
    setImageUri(uri);
    const labels = await detectFridgeItems(uri);
    setCamera(false);
    setItems(labels);
  };

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
  };

  if (!permission) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  const takeNewPhoto = () => {
    setCamera(true);
    setItems([]);
    setImageUri(null);
  };

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-center">
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission}>Grant Permission</Button>
      </View>
    );
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return camera ? (
    <View className="h-1/2 bg-black">
      <CameraView className="flex-1" facing={'back'} ref={cameraRef}>
        <View className="h-[85%]"></View>
        <View className=" flex-row justify-around">
          <Button onPress={takePicture} label="Take Picture" />
          <Button onPress={selectImage} label="Upload Image" />
        </View>
      </CameraView>
    </View>
  ) : (
    <View className="flex-1">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          paddingTop: 32,
          justifyContent: 'center',
        }}
        keyboardShouldPersistTaps="handled"
      >
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={{
              width: '100%',
              height: 300,
              resizeMode: 'contain',
            }}
          />
        )}

        <View className="w-full flex-1 items-start gap-2 px-10 py-8">
          <Text className=" text-2xl font-medium">
            Are these your ingredients?
          </Text>
          {items.length > 0 ? (
            <View className="gap-2">
              {items
                .filter((item: any) => item.probability > 0.1)
                .map((item: any, index: number) => (
                  <View
                    key={index.toString()}
                    className="flex-row items-start justify-start gap-2"
                  >
                    <Text>{`• ${item.label} (${(item.probability * 100).toFixed(2)}%)`}</Text>
                    <Text
                      className="text-sm text-red-500"
                      onPress={() => removeItem(index)}
                    >
                      ✖
                    </Text>
                  </View>
                ))}
            </View>
          ) : (
            <Text>No items found.</Text>
          )}
          <View className="w-full flex-row justify-between gap-4">
            <Button
              onPress={takeNewPhoto}
              variant="outline"
              label="Rescan"
              className="flex-1"
            />
            <Button
              onPress={takeNewPhoto}
              variant="default"
              label="Confirm"
              className="flex-1"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
