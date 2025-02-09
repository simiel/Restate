import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/Search";

const index = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <View className="px-5">
        <View className="flex flex-row items-center justify-between mt-5">
          <View className="flex flex-row items-center">
            <Image
              source={images.avatar as ImageSourcePropType}
              className="size-12 rounded-full"
            />
            <View className="flex flex-col items-start justify-center ml-2">
              <Text className="text-xs font-rubik text-black-100">Hi, Sam</Text>
              <Text className="text-base font-rubik-medium text-black-300">
                Welcome back!
              </Text>
            </View>
          </View>

          <Image
            source={icons.bell as ImageSourcePropType}
            className="size-6"
          />
        </View>
      </View>

      <Search />
    </SafeAreaView>
  );
};

export default index;
