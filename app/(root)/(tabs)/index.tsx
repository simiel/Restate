import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { logout } from "@/lib/appwrite";

const index = () => {
  return (
    <View className="flex-1 items-center content-center">
      <Text className="text-danger font-rubik text-lg">index</Text>
      <Link href={"/"}>Signin</Link>
      <Link href={"/explore"}>Explore</Link>
      <Link href={"/profile"}>Profile</Link>
      <Link href={"/properties/1"}>Properties</Link>
      <TouchableOpacity onPress={logout}>
        <Text>Touchable</Text>
      </TouchableOpacity>
    </View>
  );
};

export default index;
