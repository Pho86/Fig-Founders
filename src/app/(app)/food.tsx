import React from 'react';
import { View } from 'react-native';

import CameraComponent from '@/components/camera';

export default function FoodScreen() {
  return (
    <View style={{ flex: 1 }}>
      <CameraComponent />
    </View>
  );
}
