import { Link } from 'expo-router';
import React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

import { type Recipe } from '@/api';
import { Image, Pressable, Text, View } from '@/components/ui';

const images = [
  'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1515386474292-47555758ef2e?auto=format&fit=crop&w=800&q=80',
  'https://plus.unsplash.com/premium_photo-1666815503002-5f07a44ac8fb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=800&q=80',
];

type CardProps = Recipe & {
  style?: StyleProp<ViewStyle>; // Add style as an optional prop
};

export const Card = ({ title, id, style }: CardProps) => {
  return (
    <Link href={`/feed/${id}`} asChild>
      <Pressable>
        <View
          className="m-2 overflow-hidden rounded-xl border border-neutral-300 bg-transparent dark:bg-transparent"
          style={style}
        >
          <Image
            className="h-56 w-full overflow-hidden rounded-t-xl"
            contentFit="cover"
            source={{
              uri: images[Math.floor(Math.random() * images.length)],
            }}
          />

          <View className="p-2">
            <Text className="py-3 text-2xl ">{title}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};
