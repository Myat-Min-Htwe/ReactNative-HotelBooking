import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, FlatList } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import API_ENDPOINT from "../endpoint";
import { Card, IconButton, Button } from "react-native-paper";
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RoomScreen = ({ route, navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      title: "Rooms",
      headerStyle: {
        backgroundColor: "#79A7D3",
      },
      headerTintColor: "#0A1433",
      headerTitleStyle: {
        fontSize: 20,
      },
    });
    StatusBar.setBackgroundColor("#494D5F");
    StatusBar.setBarStyle("light-content");
  }, [navigation]);

  const { hotel } = route.params;
  const [hotelRooms, setHotelRooms] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [roomImages, setRoomImages] = useState([]);


  useEffect(() => {
    fetch(`${API_ENDPOINT}/api/hotels/${hotel.id}/`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("hotel room:", data);
        setHotelRooms(data);
      })
      .catch((error) => console.error("room error:", error));

    fetch(`${API_ENDPOINT}/api/rooms/`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("Rooms:", data);
        setRooms(data);
      })
      .catch((error) => console.error("room error:", error));

    fetch(`${API_ENDPOINT}/api/images/`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("images :", data);
        setRoomImages(data);
      })
      .catch((error) => console.error("image error:", error));
  }, [hotel.id]);

  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: "#6883BC" }}>
      <FlatList
        data={rooms.filter((room) => room.hotel === hotel.id)}
        renderItem={({ item, index }) => {
          const roomImage = roomImages.find((image) => image.room === item.id);
          return (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: "#6883BC",
              }}
            >
              <View style={{ marginTop: 16 }}>
                <Card style={{ width: wp(90) }} className="mb-4">
                  <Card.Cover
                    style={{ width: wp(90) }}
                    className="rounded-none"
                    source={
                      roomImage && roomImage.image
                        ? { uri: roomImage.image }
                        : require("../assets/images/default.jpg")
                    }
                  />
                  <Card.Content
                    style={{ width: wp(90) }}
                    className="bg-gray-900 rounded-b-lg"
                  >
                    <View className="flex-row justify-start items-center">
                      <Text className="mr-4 mt-4">
                        <Ionicons
                          name="fast-food-outline"
                          size={20}
                          color="#22d3ee"
                        />
                      </Text>
                      <Text
                        variant="bodyMedium"
                        style={{ fontSize: hp(2.2) }}
                        className="text-sky-200 mt-4"
                      >
                        Free Breakfast
                      </Text>
                    </View>
                    <View className="flex-row justify-between items-center">
                      <View className="flex-row justify-start items-center">
                        <Text className="mr-4 mt-4">
                          <Fontisto name="room" size={20} color="#fb923c" />
                        </Text>
                        <Text
                          variant="bodyMedium"
                          style={{ fontSize: hp(2.2) }}
                          className="text-sky-200 mt-4"
                        >
                          Room No :{" "}
                          <Text className="text-neutral-50">
                            {item.room_number}
                          </Text>
                        </Text>
                      </View>
                      <View className="mt-4">
                        <Text
                          style={{ fontSize: hp(2) }}
                          className="text-green-500"
                        >
                          Available
                        </Text>
                      </View>
                    </View>
                    <View className="flex-row justify-start items-center">
                      <Text className="mr-4 mt-4">
                        <Entypo name="users" size={20} color="#4ade80" />
                      </Text>
                      <Text
                        variant="bodyMedium"
                        style={{ fontSize: hp(2.2) }}
                        className="text-sky-200 mt-4"
                      >
                        Capacity :{" "}
                        <Text className="text-neutral-50">{item.capacity}</Text>
                      </Text>
                    </View>
                    <View className="flex-row justify-start items-center">
                      <Text className="mr-4 mt-4">
                        <Entypo name="price-tag" size={20} color="#fcd34d" />
                      </Text>
                      <Text
                        variant="bodyMedium"
                        style={{ fontSize: hp(2.2) }}
                        className="text-sky-200 mt-4"
                      >
                        Price :{" "}
                        <Text className="text-neutral-50">{item.price} $</Text>
                      </Text>
                    </View>
                    <View className="flex-row justify-between mt-4">
                      <View className="justify-center flex-row items-center">
                        <IconButton
                          icon="heart"
                          iconColor="#e11d48"
                          containerColor="#1e1b4b"
                          rippleColor={"#d6d3d1"}
                          size={20}
                          onPress={() => console.log("Pressed")}
                        />
                        <Text className="text-blue-700">52431 Likes</Text>
                      </View>

                      <Button
                        icon="bed"
                        contentStyle={{ height: hp(6) }}
                        textColor="#a78bfa"
                        className="justify-center"
                        mode="outlined"
                        onPress={() => navigation.navigate("Form", {item})}
                      >
                        Reserve
                      </Button>

                    </View>
                  </Card.Content>
                </Card>
              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default RoomScreen;