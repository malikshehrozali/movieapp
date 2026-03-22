import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFetch";
import { fetchMovies } from "@/services/api";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function search() {
  const [query, setQuery] = useState<string>("");

  const {
    data: movies = [],
    loading,
    error,
    refetch,
  } = useFetch(() => fetchMovies({ query: query }), false);
  useEffect(() => {
    if (query.trim() !== "") {
      refetch();
    }
  }, [query]);
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
        <View className="mt-5">
        <SearchBar
          placeholder="Search..."
          value={query}
          onChangeText={setQuery}
        />
        </View>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="my-20 self-center"
          />
        ) : error ? (
          <Text>Error fetching movies {error.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <>
              <Text className="text-lg text-white font-semibold my-5  ">
                {query ? `Search results for "${query}"` : ""}
              </Text>
              {movies?.length === 0 && (
                <Text className="text-white text-center mt-10">
                  No movies found for "{query}"
                </Text>
              )}
              {query ? (
                <FlatList
                  data={movies}
                  renderItem={({ item }) => (
                    <MovieCard
                      adult={true}
                      backdrop_path={""}
                      genre_ids={[]}
                      original_language={""}
                      original_title={""}
                      popularity={0}
                      video={false}
                      vote_count={0}
                      {...item}
                    />
                  )}
                  scrollEnabled={false}
                  numColumns={3}
                  keyExtractor={(item) => item.id.toString()}
                  // showsVerticalScrollIndicator={false}
                  columnWrapperStyle={{
                    justifyContent: "flex-start",
                    gap: 20,
                    paddingRight: 5,
                    marginBottom: 10,
                  }}
                  className="pb-32 mt-2"
                />
              ) : (
                <Text className="text-white font-bold text-center text-5xl mt-[50%]">
                  Search For Movies...
                </Text>
              )}
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
