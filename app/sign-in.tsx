import {
  View,
  Text,
  ScrollView,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect } from "expo-router";

const Signin = () => {
  const { loading, isLogged, refetch } = useGlobalContext();

  if (loading) {
    return (
      <SafeAreaView className="bg-white h-full flex justify-center items-center">
        <ActivityIndicator className="text-primary-300" size={"large"} />
      </SafeAreaView>
    );
  }

  if (!loading && isLogged) {
    console.log("🚀 ~ Signin ~ !loading && isLogged:", !loading && isLogged);
    return <Redirect href="/(root)/(tabs)/profile" />;
  }

  const handleLogin = async () => {
    const result = await login();

    if (result) {
      refetch();
    } else {
      Alert.alert("Error", "Failed to login");
    }
  };
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
            onPress={handleLogin}
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
