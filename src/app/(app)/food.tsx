import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swiper from 'react-native-deck-swiper';

import { Image, Text, View } from '@/components/ui'; // Import the Image component

export default function Food() {
  const [data, setData] = useState<any[]>([]); // To store fetched data
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  // Fetch the data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/recipes'); // Replace with your actual API endpoint
        setData(response.data.results); // Set the fetched data to state
        setIsLoading(false); // Stop loading
      } catch (error) {
        setIsError(true); // Handle any errors
        setIsLoading(false); // Stop loading even if error occurs
      }
    };

    fetchData(); // Call the fetch function
  }, []);

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center bg-pink-500">
        <Text>Error Loading data</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-pink-500">
      {isLoading ? (
        <Text>Loading...</Text> // Show loading text while fetching data
      ) : (
        <Swiper
          cards={data}
          renderCard={(item, _cardIndex) => (
            <View className="relative size-full overflow-hidden rounded-lg">
              {/* Image covers the whole screen */}
              <Image
                source={{ uri: item.image }}
                className="absolute inset-0 size-full object-cover" // Ensure it covers the entire card
              />
              {/* Title placed slightly higher */}
              <View className="absolute inset-x-4 top-16 rounded-md bg-black bg-opacity-50 p-2">
                <Text className="text-center font-bold text-white">
                  {item.title}
                </Text>
              </View>
            </View>
          )}
          onSwiped={() => {}}
          onSwipedAll={() => {}}
          cardIndex={0}
          backgroundColor="transparent"
          stackSize={2}
          stackSeparation={10}
          showSecondCard={true}
          verticalSwipe={false}
          swipeAnimationDuration={300}
          swipeBackCard={true}
        />
      )}
    </View>
  );
}
