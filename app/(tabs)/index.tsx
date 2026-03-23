import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMoviesPaginated, Movie } from "@/services/api"; // ← fetchMoviesPaginated, no useFetch
import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false); // first page load
  const [loadingMore, setLoadingMore] = useState(false); // appending pages
  const [error, setError] = useState<string | null>(null);

  const isFetching = useRef(false); // prevents duplicate requests

  const loadMovies = useCallback(
    async (pageToLoad: number) => {
      if (isFetching.current || pageToLoad > totalPages) return;
      isFetching.current = true;

      pageToLoad === 1 ? setLoading(true) : setLoadingMore(true);

      try {
        const { results, total_pages } = await fetchMoviesPaginated({
          query: "",
          page: pageToLoad,
        });
        setTotalPages(total_pages);
        setMovies((prev) =>
          pageToLoad === 1 ? results : [...prev, ...results],
        );
      } catch (err: any) {
        setError(err.message ?? "Something went wrong");
      } finally {
        setLoading(false);
        setLoadingMore(false);
        isFetching.current = false;
      }
    },
    [totalPages],
  );

  // Initial load
  useEffect(() => {
    loadMovies(1);
  }, []);

  // Load next page whenever `page` increments
  useEffect(() => {
    if (page > 1) loadMovies(page);
  }, [page]);

  const handleEndReached = () => {
    if (!loadingMore && !loading && page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const renderFooter = () =>
    loadingMore ? (
      <ActivityIndicator
        size="small"
        color="#0000ff"
        style={{ marginVertical: 16 }}
      />
    ) : null;

  if (loading) {
    return (
      <View className="bg-primary flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="bg-primary flex-1 justify-center items-center">
        <Text className="text-white">Error: {error}</Text>
      </View>
    );
  }

  return (
    <View className="bg-primary flex-1">
      <Image source={images.bg} className="absolute w-full z-0" />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        ListHeaderComponent={
          <View className="px-5">
            <Image
              source={icons.logo}
              className="w-12 h-10 mt-20 mb-5 mx-auto"
            />
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search..."
            />
            <Text className="text-lg text-white font-semibold my-5">
              Latest Movies
            </Text>
          </View>
        }
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
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginBottom: 10,
        }}
        contentContainerStyle={{ paddingBottom: 32, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}
