import React from 'react';

import { Image, Text, View } from '@/components/ui';

export default function FoodCard({ item }: { item: any }) {
  return (
    <View className="size-full rounded-lg bg-white shadow-lg">
      <Image
        className="h-5/6 w-full rounded-t-lg"
        contentFit="cover"
        source={{ uri: item.image }} // Dynamically set the image from item
      />
      <View className="flex-1 justify-center p-4">
        <Text className="text-2xl font-bold">{item.title}</Text>
        {/* Display title from item */}
        <Text className="text-lg">{`Category: ${item.category}`}</Text>
        {/* Display category from item */}
        <Text className="text-lg">{`Preparation Time: ${item.preparationTime}`}</Text>
        {/* Display prep time from item */}
      </View>
    </View>
  );
}
