import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { CachedImage } from "../helpers/image";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ChevronLeftIcon, ClockIcon, FireIcon } from "react-native-heroicons/outline";
import { Square3Stack3DIcon, UsersIcon } from "react-native-heroicons/solid";
import {HeartIcon} from 'react-native-heroicons/solid';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Loading from "../components/loading";
import YoutubeIframe from "react-native-youtube-iframe";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";

export default function RecipeDetailScreen(props) {
    let item = props.route.params;
    const navigation = useNavigation();
    const [isFavorite, setIsFavorite] = useState(false)
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

    const getMealData = async (id) => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            if (response && response.data) {
                setMeal(response.data.meals[0]);
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getMealData(item.idMeal);
    }, [])

    const ingredientIndexes = (meal) => {
        if (!meal) return [];
        let indexes = [];

        for (let i = 1; i <= 20; i++) {
            if (meal['strIngredient' + i]) {
                indexes.push(i);
            }
        }

        return indexes;
    }

    const getYoutubeId = (url) => {
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if (match && match[1]) {
            return match[1];
        }
        return null;
    }

    return (
        <ScrollView className='bg-white flex-1' showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 30}}>
            <StatusBar style='light' />

            {/* recipe image */}
            <View className='flex-row justify-center'>  
                <CachedImage 
                    uri= {item.strMealThumb}
                    style={{width: wp(98), height: hp(50), borderRadius: 53, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, marginTop: 4}}
                />
            </View>

            {/* back button */}
            <Animated.View entering={FadeIn.delay(200).duration(1000)} className='absolute pt-14 flex-row justify-between w-full items-center'>
                <TouchableOpacity onPress={() => navigation.goBack()} className='p-2 rounded-full ml-5 bg-white'>
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color={'#fbbf24'} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)} className='p-2 rounded-full bg-white mr-5'>
                    <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavorite ? 'red' : 'gray'}/>
                </TouchableOpacity>
            </Animated.View>

            {/* Detail */}
            {
                loading ? (
                    <Loading size='large' className='mt-16' />
                ) : (
                    <View className='px-4 pt-8 justify-between space-y-4'>
                        <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className='space-y-2'>
                            <Text style={{fontSize: hp(3)}} className='font-bold flex-1 text-neutral-700'>
                                {meal?.strMeal}
                            </Text>
                            <Text style={{fontSize: hp(2)}} className='font-medium flex-1 text-neutral-500'>
                                {meal?.strArea}
                            </Text>
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className='flex-row justify-around'>
                            <View className='bg-amber-300 p-2 rounded-full'>
                                <View style={{width: hp(6.5), height: hp(6.5)}} className='bg-white rounded-full flex items-center justify-center'>
                                    <ClockIcon size={hp(2.5)} strokeWidth={2.5} color={'#525252'} />
                                </View>

                                <View className='items-center justify-center py-2 space-y-1'>
                                    <Text style={{fontSize: hp(2)}} className='font-bold text-neutral-700'>35</Text>
                                    <Text style={{fontSize: hp(1.4)}} className='font-bold text-neutral-700'>Mins</Text>
                                </View>
                            </View>
                            <View className='bg-amber-300 p-2 rounded-full'>
                                <View style={{width: hp(6.5), height: hp(6.5)}} className='bg-white rounded-full flex items-center justify-center'>
                                    <UsersIcon size={hp(2.5)} strokeWidth={2.5} color={'#525252'} />
                                </View>

                                <View className='items-center justify-center py-2 space-y-1'>
                                    <Text style={{fontSize: hp(2)}} className='font-bold text-neutral-700'>03</Text>
                                    <Text style={{fontSize: hp(1.4)}} className='font-bold text-neutral-700'>Servings</Text>
                                </View>
                            </View>
                            <View className='bg-amber-300 p-2 rounded-full'>
                                <View style={{width: hp(6.5), height: hp(6.5)}} className='bg-white rounded-full flex items-center justify-center'>
                                    <FireIcon size={hp(2.5)} strokeWidth={2.5} color={'#525252'} />
                                </View>

                                <View className='items-center justify-center py-2 space-y-1'>
                                    <Text style={{fontSize: hp(2)}} className='font-bold text-neutral-700'>103</Text>
                                    <Text style={{fontSize: hp(1.4)}} className='font-bold text-neutral-700'>Cal</Text>
                                </View>
                            </View>
                            <View className='bg-amber-300 p-2 rounded-full'>
                                <View style={{width: hp(6.5), height: hp(6.5)}} className='bg-white rounded-full flex items-center justify-center'>
                                    <Square3Stack3DIcon size={hp(2.5)} strokeWidth={2.5} color={'#525252'} />
                                </View>

                                <View className='items-center justify-center py-2 space-y-1'>
                                    <Text style={{fontSize: hp(2)}} className='font-bold text-neutral-700'>So</Text>
                                    <Text style={{fontSize: hp(1.4)}} className='font-bold text-neutral-700'>Easy</Text>
                                </View>
                            </View>
                        </Animated.View>

                        {/* Ingredients */}
                        <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className='space-y-4'>
                            <Text style={{fontSize: hp(2.5)}} className='font-bold flex-1 text-neutral-700'>Ingredients</Text>
                            <View className='space-y-2 ml-3'>
                                {
                                    ingredientIndexes(meal).map((i) => {
                                        return (
                                            <View key={i} className='flex-row space-x-4'>
                                                <View style={{width: hp(1.5), height: hp(1.5)}} className='bg-amber-500 rounded-full'></View>
                                                <View className='flex-row space-x-2'>
                                                    <Text style={{fontSize: hp(1.7)}} className='font-extrabold text-neutral-600'>{meal['strMeasure' + i]}</Text>
                                                    <Text style={{fontSize: hp(1.7)}} className='font-medium text-neutral-600'>{meal['strIngredient' + i]}</Text>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </Animated.View>

                        {/* Instructions */}
                        <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className='space-y-4'>
                            <Text style={{fontSize: hp(2.5)}} className='font-bold flex-1 text-neutral-700'>Instructions</Text>
                            <Text style={{fontSize: hp(1.6)}} className='text-neutral-700'>
                                {meal?.strInstructions}
                            </Text>
                        </Animated.View>

                        {/* video */}
                        {
                            meal.strYoutube && (
                                <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)} className='space-y-4'>
                                    <Text style={{fontSize: hp(2.5)}} className='font-bold flex-1 text-neutral-700'>Recipe Video</Text>
                                    <View>
                                        <YoutubeIframe videoId={getYoutubeId(meal.strYoutube)} height={hp(30)} />
                                    </View>
                                </Animated.View>
                            )
                        }
                    </View>
                )
            }
        </ScrollView>
    );
}
