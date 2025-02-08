import {
  View,
  Text,
  ScrollView,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";

const Signin = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.onboarding as ImageSourcePropType}
          className="w-full h-4/6"
          resizeMode="contain"
        />
        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome to Restate
          </Text>
          <Text className="text-3xl text-center capitalize font-rubik-bold text-black-300 mt-2 ">
            Let's get you closer to {"\n"}
            <Text className="text-primary-300">Your ideal home</Text>
          </Text>

          <Text className="mt-12 font-rubik text-black-200 text-center text-lg">
            {" "}
            Login to Restate with Google
          </Text>

          <TouchableOpacity
            onPress={() => {}}
            className="items-center justify-center rounded-full flex-row w-full py-4 mt-5 shadow-zinc-100 shadow-md bg-white"
          >
            <Image
              source={icons.google as ImageSourcePropType}
              className="w-5 h-5"
              resizeMode="contain"
            />
            <Text className="text-center  font-rubik-medium text-black-300 text-lg ml-2">
              Login with Google
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;
