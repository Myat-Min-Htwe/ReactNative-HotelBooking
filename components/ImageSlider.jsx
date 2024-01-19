import React from 'react';
import { View, Text, Image } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { sliderImages } from '../constants/slide';
import Carousel from 'react-native-reanimated-carousel';

const ImageSlider = () => {
  return (
            <Carousel
                loop
                width={wp(100)}
                height={hp(25)}
                autoPlay={true}
                mode='parallax'
                data={sliderImages}
                scrollAnimationDuration={2000}
                renderItem={({ item, index }) => (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Image 
                        source={item}
                        style={{ width: wp(100), height: hp(25), resizeMode: 'cover'}}
                        />
                    </View>
                )}
            />
  );
};

export default ImageSlider;
