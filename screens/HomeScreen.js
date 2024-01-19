import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ImageSlider from "../components/ImageSlider";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import API_ENDPOINT from "../endpoint";
import Animated, { FadeInLeft } from "react-native-reanimated";
import {
  Modal,
  Portal,
  Button,
  PaperProvider,
  Badge,
} from "react-native-paper";

const HomeScreen = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "#a1a1aa", padding: 20, flex: 1 };

  useEffect(() => {
    navigation.setOptions({
      title: "Top 5 Luxurious Hotels in Bagan",
      headerStyle: {
        backgroundColor: "#79A7D3", // Set the desired background color
      },
      headerTintColor: "#0A1433", // Set the text color of the header title
      headerTitleStyle: {
        fontSize: 18,
      },
      // headerRight: () => (
      //   <TouchableOpacity style={{ marginRight: wp(4)}} onPress={() => handleMenuPress()}>
      //     <Octicons name="three-bars" size={30} color="#0A1433" />
      //   </TouchableOpacity>
      // ),
    });
    StatusBar.setBackgroundColor("#494D5F");
    StatusBar.setBarStyle("light-content");
  }, [navigation]);

  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetch(`${API_ENDPOINT}/api/hotels/`)
      .then((response) => response.json())
      .then((data) => {
        // console.log('Fetched Hotels: ', data);
        setHotels(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <PaperProvider>
      <SafeAreaView
        style={{ backgroundColor: "#6883BC", position: "relative" }}
        className="flex-1 flex space-y-5"
        edges={["top"]}
      >
        <View
          style={{ width: wp(100), height: hp(25) }}
          className="mx-auto flex"
        >
          <ImageSlider />
        </View>

        <ScrollView>
          <Animated.View
            entering={FadeInLeft.delay(400).springify()}
            className="flex items-center mt-2"
          >
            {hotels.map((hotel) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Room", { hotel })}
                key={hotel.id}
                style={{ height: hp(10), width: wp(90), marginBottom: hp(1) }}
                className="flex-row mx-auto bg-gray-900 items-center justify-between px-2 rounded-lg"
              >
                <View>
                  <Text
                    style={{ fontSize: hp(2.5) }}
                    className="font-bold text-sky-200"
                  >
                    {hotel.name}
                  </Text>
                </View>
                <Text>
                  <Ionicons
                    name="arrow-redo-circle"
                    size={30}
                    color="#FAD000"
                  />
                </Text>
              </TouchableOpacity>
            ))}
          </Animated.View>

          <Badge className="mt-4 mr-4 text-yellow-400">Warning</Badge>
          <TouchableOpacity className="justify-center items-center mb-8">
            <View
              style={{ width: wp(90), height: hp(8) }}
              className="bg-cyan-300 justify-evenly flex-row items-center rounded-full"
            >
              <Text>
                <MaterialCommunityIcons
                  name="timeline-check-outline"
                  size={40}
                  color="#404040"
                />
              </Text>
              <Text
                style={{ fontSize: hp(3), fontWeight: "bold" }}
                className="text-neutral-700"
                onPress={showModal}
              >
                Check Reservation
              </Text>
            </View>
          </TouchableOpacity>

          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={containerStyle}
            >
              <Text
                className="text-yellow-500 tracking-widest bg-slate-800 text-center py-6"
                style={{ fontSize: hp(4), fontWeight: "bold" }}
              >
                Sorry,
              </Text>
              <Text
                className="text-yellow-500 tracking-wide bg-slate-800 text-center py-6"
                style={{ fontSize: hp(4) }}
              >
                Just adding Modal component.Cann't use for validated checking.
              </Text>
            </Modal>
          </Portal>

          <View className="justify-center items-center mt-4">
            <View className="items-center" style={{ width: wp(90) }}>
              <Text>&copy; CopyRight - 2024.All right Reserved.</Text>
              <Text className="text-neutral-700" style={{ fontSize: hp(3) }}>
                Myat Min Htwe
              </Text>
            </View>
          </View>
        </ScrollView>
        {/* <FAB
          icon="plus"
          style={{position: 'absolute',bottom: 24, right: 24}}
          onPress={() => console.log('Pressed')}
        /> */}
      </SafeAreaView>
    </PaperProvider>
  );
};

export default HomeScreen;
