import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, Text, View } from "react-native";

interface Movie {
  id: number;
  title: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export default function Index() {
  const router = useRouter();
  const [data, setData] = useState([]);
  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchMovies();
      setData(data);
    };
    loadMovies();
  }, []);
  return (
    <View className="bg-primary flex-1">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        <View className="flex-1 mt-5">
          <SearchBar
            onPress={() => router.push("/search")}
            placeholder="Search..."
          />
        </View>
        <View></View>
      </ScrollView>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text className="text-white">{item.title}</Text>
        )}
        contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
