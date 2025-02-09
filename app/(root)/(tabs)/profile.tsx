import {
  View,
  Text,
  ScrollView,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { settings } from "@/constants/data";
import { useGlobalContext } from "@/lib/global-provider";
import { logout } from "@/lib/appwrite";

interface SettingsItemProps {
  title: string;
  icon: ImageSourcePropType;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({
  title,
  icon,
  onPress = () => {},
  textStyle,
  showArrow = true,
}: SettingsItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-row items-center justify-between py-3 rounded-full mt-5"
    >
      <View className="flex flex-row items-center gap-3">
        <Image source={icon} className="size-6" />
        <Text className={`text-lg font-rubik-medium ${textStyle}`}>
          {title}
        </Text>
      </View>
      {showArrow && (
        <Image
          source={icons.rightArrow as ImageSourcePropType}
          className="size-5"
        />
      )}
    </TouchableOpacity>
  );
};

const profile = () => {
  const { user, refetch } = useGlobalContext();

  const handleLogout = async () => {
    console.log("🚀 ~ handleLogout ~ result:");
    const result = await logout();
    if (result) {
      Alert.alert("Success", "Logged out successfully");
      refetch();
    } else {
      Alert.alert("Error", "Failed to logout");
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row justify-between items-center mt-5">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image
            source={icons.bell as ImageSourcePropType}
            className="size-5"
          />
        </View>

        <View className="flex-row justify-center flex mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <Image
              source={{ uri: user?.avatar }}
              className="size-44 relative rounded-full"
            />

            <TouchableOpacity className="absolute bottom-11 right-2">
              <Image
                source={icons.edit as ImageSourcePropType}
                className="size-9 "
              />
            </TouchableOpacity>

            <Text className="text-2xl font-rubik-bold mt-2">{user?.name}</Text>
          </View>
        </View>

        <View className="flex flex-col mt-10">
          <SettingsItem
            title="My Bookings"
            icon={icons.calendar as ImageSourcePropType}
          />
          <SettingsItem
            title="Payment"
            icon={icons.wallet as ImageSourcePropType}
          />
        </View>

        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          {settings.slice(2).map((item, index) => {
            return (
              <SettingsItem
                key={index}
                title={item.title}
                icon={item.icon as ImageSourcePropType}
                onPress={() => {}}
                textStyle="text-black-400"
                showArrow={true}
              />
            );
          })}
        </View>

        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          <SettingsItem
            title="Logout"
            icon={icons.logout as ImageSourcePropType}
            onPress={handleLogout}
            textStyle="text-danger"
            showArrow={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default profile;
