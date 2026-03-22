import { icons } from "@/constants/icons";
import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";

interface props {
  placeholder: string;
  onPress: () => void;
}

export default function SearchBar({ placeholder, onPress }: props) {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image source={icons.search} />
      <TextInput
        placeholder={placeholder}
        value=""
        onChange={() => {}}
        placeholderTextColor={"#a8b5db"}
        onPress={onPress}
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
}

const styles = StyleSheet.create({});
