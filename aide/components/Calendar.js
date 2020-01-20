import React from 'react';
import moment from "moment";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Constant } from '../utils/Variables'


const DAYSINWEEK = 
    [
        {label: "S", props: "sunday", value: "0"},
        {label: "M", props: "monday", value: "1" },
        {label: "T", props: "tuesday", value: "2" },
        {label: "W", props: "wedsnday", value: "3"},
        {label: "R", props: "thursday", value: "4"},
        {label: "F", props: "friday", value: "5"},
        {label: "S", props: "saturday", value: "6"},
    ];

export const Calendar = ({ data }) => (
  <View style={styles.background}>
    <PopulateDaysInAWeek />
    <GetDates />
  </View>
)

const PopulateDaysInAWeek = () => (
  <FlatList
    data={DAYSINWEEK}
    contentContainerStyle={styles.List}
    renderItem={({item}) => 
      <View>
        <Text style={styles.Text}> 
          {item.label}
        </Text>
      </View>}
  />
)

const GetDates = () => {
    const year = new Date().getFullYear();
    const currentmonth = new Date().getMonth();
    const result = [];
    const date = new Date(year, currentmonth, 1);

    if(date.getDay() !== 0)
    {
        const difference = 6 - date.getDay();
        for(let i = 0; i < difference; i++)
        {
            result.push({ Day: DAYSINWEEK[i].props, Date: ""})
        }
    }
    console.log(DAYSINWEEK[date.getDay()]);
    
    while (date.getMonth() === currentmonth) {
         const temp = {};
         temp.Day = DAYSINWEEK[date.getDay()].props;
         temp.Date = date.getDate()
         result.push({ ...temp});
         date.setDate(date.getDate() + 1);
    }

    return null;
}

// const PopulateDates = () => (

// //   <FlatList
// //     data={getDates()}
// //     contentContainerStyle={styles.List}
// //     renderItem={({item}) => 
// //       <TouchableOpacity>
// //         <Text style={styles.Text}> 
// //           {item.Date}
// //         </Text>
// //       </TouchableOpacity>}
// //   />
// )

const styles = StyleSheet.create({ 
    background: {
        backgroundColor: '#EBEBEB',
        width: Constant.MAX_WIDTH * 0.8,
        height: Constant.MAX_HEIGHT * 0.3,
        borderRadius: 12,
    },
    List: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    Text: {
        fontFamily: 'Comfortaa',
        fontSize: 15,
        fontWeight: 'bold'
    }
});