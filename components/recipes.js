import { View, Text, Pressable, Image } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import React from "react";
import MasonryList from "@react-native-seoul/masonry-list";
import { mealData } from "../constants";
import Animated, { FadeInDown } from "react-native-reanimated";
import Loading from "./loading";
import { CachedImage } from "../helpers/image";
import { useNavigation } from "@react-navigation/native";

export default function Recipes({ categories, meals }) {
    const navigation = useNavigation();
    return (
        <View className="mx-4 space-y-3">
            <Text style={{ fontSize: hp(3) }} className="font-semibole text-neutral-600">
                Recipes
            </Text>
            {categories.length == 0 || meals.length == 0 ? (
                <Loading size="large" className="mt-20" />
            ) : (
                <View>
                    <MasonryList
                        data={meals}
                        keyExtractor={(item) => item.idMeal}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, i }) => <RecipeCard navigation={navigation} item={item} index={i} />}
                        onEndReachedThreshold={0.1}
                    />
                </View>
            )}
        </View>
    );
}

const RecipeCard = ({ item, index, navigation }) => {
    let isEven = index % 2 == 0;
    return (
        <Animated.View
            entering={FadeInDown.delay(index * 100)
                .duration(600)
                .springify()
                .damping(20)}>
            <Pressable onPress={() => navigation.navigate('RecipeDetail', {...item})}
                style={{ width: "100%", paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }}
                className="flex justify-center mb-4 space-y-1">
                <CachedImage
                    uri={ item.strMealThumb }
                    style={{ width: "100%", height: index % 3 == 0 ? hp(25) : hp(35), borderRadius: 35 }}
                    className="bg-black/5"
                />
                <Text
                    style={{ fontSize: hp(1.5), width: 170 }}
                    className="font-semibold text-center text-neutral-600"
                    numberOfLines={1}>
                    {item.strMeal}
                </Text>
            </Pressable>
        </Animated.View>
    );
};
