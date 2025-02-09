import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";

interface Props {
  onPress: () => void;
}

export const FeaturedCard = ({ onPress }: Props) => {
  return (
    <TouchableOpacity className="flex flex-col items-start w-60 h-80 relative">
      <Image
        source={images.japan as ImageSourcePropType}
        className="size-full rounded-2xl"
      />
      <Image
        source={images.cardGradient as ImageSourcePropType}
        className="size-full rounded-2xl absolute bottom-0"
      />

      <View className="flex flex-row items-center bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5">
        <Image
          source={icons.star as ImageSourcePropType}
          className="size-3.5"
        />
        <Text className=" font-rubik-bold text-primary-300 ml-1 text-xs">
          4.4
        </Text>
      </View>

      <View className="flex flex-col items-start absolute bottom-5 inset-x-5">
        <Text
          numberOfLines={1}
          className="font-rubik-extrabold text-white text-xl"
        >
          Modern Apartment
        </Text>
        <Text className="text-base font-rubik text-white">
          22 Miami Beach, FL
        </Text>

        <View className="flex flex-row items-center justify-between w-full">
          <Text className="text-xl font-rubik-extrabold text-white">$3500</Text>
          <Image
            source={icons.heart as ImageSourcePropType}
            className="size-5"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = () => {
  return (
    <View>
      <Text>Card</Text>
    </View>
  );
};
