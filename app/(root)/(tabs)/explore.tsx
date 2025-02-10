import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  FlatList,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import { useGlobalContext } from "@/lib/global-provider";
import { router, useLocalSearchParams } from "expo-router";
import { useAppwrite } from "@/lib/useAppwrite";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import NoResults from "@/components/NoResults";

const Explore = () => {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const {
    data: properties,
    loading: propertiesLoading,
    refetch: refetchProperties,
  } = useAppwrite({
    fn: getProperties,
    params: { query: params.query!, filter: params.filter!, limit: 30 },
    skip: true,
  });

  useEffect(() => {
    refetchProperties({
      filter: params.filter!,
      query: params.query!,
      limit: 30,
    })
      .then(() => console.log("Properties re-fetched"))
      .catch((err) => console.log(err));
  }, [params.query, params.filter]);

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={properties}
        ListEmptyComponent={
          propertiesLoading ? (
            <ActivityIndicator className="text-primary-300 mt-5" />
          ) : (
            <NoResults />
          )
        }
        renderItem={({ item }) => (
          <Card
            item={item}
            onPress={() => {
              handleCardPress(item.$id);
            }}
          />
        )}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row justify-between items-center mt-5">
              <TouchableOpacity
                onPress={router.back}
                className="flex flex-row bg-primary-200 size-11 justify-center items-center rounded-full"
              >
                <Image
                  source={icons.backArrow as ImageSourcePropType}
                  className="size-5"
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <Text className="text-base text-center mr-2 font-rubik-medium text-black-300">
                Search for your ideal home
              </Text>

              <Image
                source={icons.bell as ImageSourcePropType}
                className="size-6"
              />
            </View>
            <Search />

            <View className="mt-5">
              <Filters />
              <Text className="text-xl font-rubik-bold text-black-300 mt-5">
                Found {properties?.length} Properties
              </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Explore;
