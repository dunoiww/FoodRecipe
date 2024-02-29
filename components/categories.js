import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import React from "react";
import { categoryData } from "../constants";
import Animated, { FadeInDown } from "react-native-reanimated";
import { CachedImage } from "../helpers/image";

export default function Categories({ categories, activeCategory, handleChangeCategory }) {
    return (
        <Animated.View entering={FadeInDown.duration(500).springify()}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                className="space-x-4">
                {categories.map((category, index) => {
                    let isActive = category.strCategory == activeCategory;
                    let activeButtonClass = isActive ? "bg-amber-400" : "bg-black/10";
                    return (
                        <TouchableOpacity
                            onPress={() => handleChangeCategory(category.strCategory)}
                            key={index}
                            className="flex items-center space-y-1">
                            <View className={"rounded-full p-[6px] " + activeButtonClass}>
                                {/* <Image
                                    source={{ uri: category.strCategoryThumb }}
                                    className="rounded-full"
                                    style={{ width: hp(6), height: hp(6) }}
                                /> */}
                                <CachedImage
                                    uri= {category.strCategoryThumb }
                                    className="rounded-full"
                                    style={{ width: hp(6), height: hp(6) }}
                                />
                            </View>

                            <Text className="text-neutral-600" style={{ fontSize: hp(1.6) }}>
                                {category.strCategory}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </Animated.View>
    );
}
