import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, {useEffect} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInLeft, FadeInDown, FadeInRight } from 'react-native-reanimated';

const WelcomeScreen = ({navigation}) => {
    useEffect(() => {
        navigation.setOptions({ headerShown: false });
      }, [navigation]);

    return (
        <View className="flex-1 flex justify-center">
        <StatusBar style='dark' />
        <Image className="h-full w-full absolute" source={require('../assets/images/welcome1.jpg')} />
        
            <LinearGradient 
                colors={['transparent', '#18181b']}
                style={{width: wp(100), height: hp(70)}}
                start={{x:0.2, y:0}}
                end={{x:0.2, y:1}}
                className="flex flex-1 justify-center pt-12 space-y-12"
            >
            <Animated.View entering={FadeInLeft.delay(400).springify()} className="flex items-center">
                <Text style={{fontSize: hp(8)}} className="font-bold text-amber-500 tracking-widest">BAGAN</Text>
                <Text style={{fontSize: hp(4)}} className="font-bold text-sky-200 tracking-widest">
                    Luxury Hotels
                </Text>
                <Animated.View entering={FadeInRight.delay(600).springify()} className="flex items-center">
            <Text style={{fontSize: hp(3)}} className="font-bold text-sky-100 tracking-widest">
                    booking and save your time
                </Text>
            </Animated.View>
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(800).springify()}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Home')}
                    style={{height: hp(8), width: wp(80)}}
                    className="mx-auto bg-gray-950 flex items-center justify-center rounded-full border-[2px] border-sky-100"
                >
                    <Text style={{fontSize: hp(4)}} className="text-sky-200 font-bold tracking-wider">Check Now</Text>
                </TouchableOpacity>
            </Animated.View>
            </LinearGradient>
        </View>
    )
}

export default WelcomeScreen;