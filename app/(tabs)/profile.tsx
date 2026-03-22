import { images } from "@/constants/images";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function profile() {
  return (
    <View className="bg-primary flex-1">
      <Image source={images.bg} className="absolute w-full z-0" />
      <Text className="text-white text-5xl font-bold text-center mt-[50%]">
        Profile Page{"\n"}Coming Soon
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
