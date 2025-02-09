import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import icons from "@/constants/icons";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = React.useState(params.query ?? "");
  const debouncedSearch = useDebouncedCallback((text: string) => {
    router.setParams({ query: text });
  }, 500);

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  return (
    <View className="flex flex-row items-center justify-between w-full px-4 mt-5 rounded-lg bg-accent-100 border border-primary-100 py-2">
      <View className="flex-1 flex flex-row items-center justify-start z-50">
        <Image
          source={icons.search as ImageSourcePropType}
          className="size-5"
        />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          className="flex-1 ml-2 text-sm text-black-300 font-rubik"
          placeholder="Search for anything"
        />
      </View>

      <TouchableOpacity className="">
        <Image
          source={icons.filter as ImageSourcePropType}
          className="size-5"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
