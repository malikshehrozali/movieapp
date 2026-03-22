import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MovieCard({
  id,
  title,
  poster_path,
  release_date,
  vote_average,
  overview,
  adult,
  original_language,
}: Movie) {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : `https://placehold.co/600*400/1a1a1a/ffffff.png`,
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text
          className="text-white text-sm font-semibold mt-2"
          numberOfLines={1}
        >
          {title}
        </Text>
        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} />
          <Text className="text-white uppercase  text-sm">
            {Math.round(vote_average / 2)}
          </Text>
        </View>
        <Text className="absolute top-2 left-2 px-2 py-1 rounded-full text-white bg-red-500">
          {adult ? "18+" : original_language}
        </Text>
        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {release_date?.split("-")[0]}
          </Text>

        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({});
