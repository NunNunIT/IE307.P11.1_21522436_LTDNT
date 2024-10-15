import React, { useState } from 'react';
import {
  FlatList,
  SectionList,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { workouts, fruits_vegetables } from './data';

type ItemProps = {
  title: string;
  onPress: () => void;
  selected: boolean;
};

const Item = ({ title, onPress, selected }: ItemProps) => (
  <View className="mb-2 flex-row items-center justify-between rounded bg-gray-100 p-2">
    <Text>{title}</Text>
    <TouchableOpacity
      className={`px-4 py-2 ${selected ? 'bg-rose-500' : 'bg-blue-500'} rounded`}
      onPress={onPress}>
      <Text className="text-white">{selected ? 'DESELECT' : 'SELECT'}</Text>
    </TouchableOpacity>
  </View>
);

const SelectList = () => {
  const [selectedWorkOutItems, setSelectedWorkOutItems] = useState<string[]>([]);
  const [selectedVegetableItems, setSelectedVegetableItems] = useState<string[]>([]);
  const [selectedFruitItems, setSelectedFruitItems] = useState<string[]>([]);

  const handleSelect = (item: string, listType: 'workout' | 'fruit' | 'vegetable') => {
    if (listType === 'workout') {
      setSelectedWorkOutItems((prevSelected) =>
        prevSelected.includes(item)
          ? prevSelected.filter((i) => i !== item)
          : [...prevSelected, item]
      );
    } else if (listType === 'fruit') {
      setSelectedFruitItems((prevSelected) =>
        prevSelected.includes(item)
          ? prevSelected.filter((i) => i !== item)
          : [...prevSelected, item]
      );
    } else {
      setSelectedVegetableItems((prevSelected) =>
        prevSelected.includes(item)
          ? prevSelected.filter((i) => i !== item)
          : [...prevSelected, item]
      );
    }
  };

  const renderFlatItem = ({ item }: { item: { type: string } }) => (
    <Item
      title={item.type}
      onPress={() => handleSelect(item.type, 'workout')}
      selected={selectedWorkOutItems.includes(item.type)}
    />
  );

  const renderSectionItem = ({ item, section }: { item: string; section: { title: string } }) => {
    const isFruit = section.title === 'Fruits';
    return (
      <Item
        title={item}
        onPress={() => handleSelect(item, isFruit ? 'fruit' : 'vegetable')}
        selected={
          isFruit ? selectedFruitItems.includes(item) : selectedVegetableItems.includes(item)
        }
      />
    );
  };

  return (
    <View className="flex flex-1 flex-col gap-2 bg-zinc-100 dark:bg-black">
      {/* FlatList for workouts */}
      <View className="flex-[0.45]">
        <ImageBackground
          source={{
            uri: 'https://file.hstatic.net/200000739531/file/phong-tap-rock___it_fitness-center-sfit-bodies_dbd01595847d48cca0f8cf1daed81344_grande.jpg',
          }}
          resizeMode="cover">
          <View className="absolute inset-0 h-full w-full bg-black/50" />
          <View className="p-4">
            <Text className="mb-2 text-center text-xl font-bold text-white dark:text-white">
              FlatList - Workouts
            </Text>
            <FlatList
              data={workouts}
              renderItem={renderFlatItem}
              keyExtractor={(item) => item.id}
              className="max-h-[30vh] scroll-smooth"
            />
          </View>
        </ImageBackground>
      </View>

      {/* SectionList for fruits and vegetables */}
      <View className="flex-[0.45]">
        <ImageBackground
          source={{
            uri: 'https://thumbs.dreamstime.com/b/various-fruits-blending-together-colorful-explosion-printable-artistic-various-fruits-blending-together-colorful-290710928.jpg',
          }}
          resizeMode="cover">
          <View className="absolute inset-0 h-full w-full bg-black/50" />
          <View className="p-4">
            <Text className="mb-2 text-center text-xl font-bold text-white dark:text-white">
              SectionList - Fruits & Vegetables
            </Text>
            <SectionList
              sections={fruits_vegetables}
              keyExtractor={(item, index) => item + index}
              renderItem={renderSectionItem}
              renderSectionHeader={({ section }) => (
                <View className="sticky top-0 mb-2 flex-row items-center justify-between rounded bg-blue-200 p-2">
                  <Text className="text-lg font-bold">{section.title}</Text>
                  <Image source={{ uri: section.url }} className="h-8 w-8" />
                </View>
              )}
              className="relative max-h-[30vh] scroll-smooth"
            />
          </View>
        </ImageBackground>
      </View>

      {/* Display selected items */}
      <View className="flex flex-[0.15] flex-col items-start justify-start gap-2 bg-white p-2 dark:bg-zinc-900">
        <ScrollView>
          <View className="flex flex-row flex-wrap gap-2">
            <Text className="mb-2 font-bold text-red-600">Exercise:</Text>
            {selectedWorkOutItems.map((item, index) => (
              <>
                <Text key={index} className="mb-1 w-fit rounded-full bg-sky-500 px-2 text-white">
                  {item}
                </Text>
              </>
            ))}
          </View>
          <View className="flex flex-row flex-wrap gap-2">
            <Text className="mb-2 font-bold text-red-600">Fruit:</Text>
            {selectedFruitItems.map((item, index) => (
              <>
                <Text key={index} className="mb-1 w-fit rounded-full bg-sky-500 px-2 text-white">
                  {item}
                </Text>
              </>
            ))}
          </View>

          <View className="flex flex-row flex-wrap gap-2">
            <Text className="mb-2 font-bold text-red-600">Vetgetable:</Text>
            {selectedVegetableItems.map((item, index) => (
              <>
                <Text key={index} className="mb-1 w-fit rounded-full bg-sky-500 px-2 text-white">
                  {item}
                </Text>
              </>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SelectList;
