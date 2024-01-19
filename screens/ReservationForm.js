import { View, Text, StyleSheet, ScrollView, Pressable, Platform, Alert, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import API_ENDPOINT from "../endpoint";
import { Card, Button, TextInput } from "react-native-paper";
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';




const ReservationForm = ({route, navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      title: "Reservation",
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

    const {item} = route.params
    const [roomImages, setRoomImages] = useState([]);

    const [guestName, setGuestName] = useState("");

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [checkInDate, setCheckInDate] = useState("");

    const toggleDatePicker = () => {
      setShowPicker(!showPicker);
    }

    const onChange = ({ type }, selectedDate) => {
      if (type === "set") {
        const currentDate = selectedDate;
        setDate(currentDate);
    
        if (Platform.OS === "android") {
          toggleDatePicker();

          setCheckInDate(formatDate(currentDate));
        }
      } else {
        toggleDatePicker();
      }
    };

    const formatDate = (rawDate) => {
      let date = new Date(rawDate);

      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      return `${year}-${month}-${day}`;
    }

    // useEffect(() => {
    //   console.log("Guest Name:", guestName);
    // }, [guestName]);

        


    useEffect(() => {
      fetch(`${API_ENDPOINT}/api/images/`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("images :", data);
        setRoomImages(data);
      })
      .catch((error) => console.error("image error:", error));
    }, []);

    const roomImage = roomImages.find((image) => image.room === item.id);


    // handling booking data to backend................

    const handleBooking = async () => {
      try {

        if (!guestName) {

          Alert.alert('Alert','Guest_Name is required')
          return;
        }
        if (!checkInDate) {

          Alert.alert('Alert','Check_In_Date is required')
          return;
        }

        const response = await fetch(`${API_ENDPOINT}/api/reservations/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            room: item.id,
            guest_name: guestName,
            check_in_date: checkInDate,
          }),
        });
    
        if (response.ok) {
          setGuestName("");
          setCheckInDate("");
          Alert.alert('Booking Successful', 'Your reservation has been successfully booked.');
          // console.log('Booking successful');
        } else {
          console.error('Booking failed');
        }
      } catch (error) {
        console.error('Error during booking:', error);
      }
    };


  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#6883BC",
      }}
    >
      <ScrollView style={{ marginTop: 16 }}>
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
                    
                    <SafeAreaView
                      style = {styles.form}
                      className = "justify-center items-center mt-6"
                    >
                      <View className="">
                        
                        <TextInput
                          left={<TextInput.Icon icon="account-arrow-right" />}
                          style = {{backgroundColor: '#0f172a', width: wp(70), height: hp(6),fontSize: hp(2)}}
                          className = "rounded mx-auto mb-6"
                          textColor='white'
                          placeholder='Guest Name'
                          value={guestName}
                          placeholderTextColor={'#94a3b8'}
                          onChangeText={(text) => setGuestName(text)}
                        />
                      </View>

                      <View>
                        {showPicker && (
                          <DateTimePicker
                          mode = "date"
                          display="spinner"
                          value = {date}
                          onChange = {onChange}
                          maximumDate={new Date('2024-12-31')}
                          minimumDate={new Date('2024-1-1')}
                        />
                        )}

                        {!showPicker && (
                          <Pressable
                          onPress={toggleDatePicker}
                        >
                          <TextInput 
                            left={<TextInput.Icon icon="calendar-month" />}
                            style={{backgroundColor: '#0f172a', width: wp(70), height: hp(6),fontSize: hp(2),color: '#fff'}}
                            className = "rounded mx-auto mb-6"
                            textColor='white'
                            placeholder='Check in date'
                            value={checkInDate}
                            placeholderTextColor={'#94a3b8'}
                            editable={false}
                            onPressIn={toggleDatePicker}
                          />
                        </Pressable>
                        )}
                      </View>

                      <View className="mb-6">
                      <Button
                        icon="card-account-details-star"
                        contentStyle={{ height: hp(6), justifyContent: "center" }}
                        textColor="#a78bfa"
                        buttonColor='#0f172a'
                        mode="contained-tonal"
                        onPress={() => handleBooking()} // call the function to reserve booking
                      >
                        Booking
                      </Button>
                      </View>
                    </SafeAreaView>
                  </Card.Content>
                </Card>
              </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: "#64748b",
    borderRadius: 20,
  }
})

export default ReservationForm;