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
    <PopulateDates data={data} />
  </View>
)

const PopulateDaysInAWeek = () => (
  <FlatList
    data={DAYSINWEEK}
    contentContainerStyle={styles.List}
    renderItem={({item}) => 
      <View style={styles.box}>
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
        for(let i = 0; i < date.getDay() ; i++)
        {
            result.push({ Day: DAYSINWEEK[i].props, Date: ""})
        }
    }
    
    while (date.getMonth() === currentmonth) {
         const temp = {};
         temp.Day = DAYSINWEEK[date.getDay()].props;
         temp.Date = date.getDate()
         result.push({ ...temp});
         date.setDate(date.getDate() + 1);
    }

    if(result[result.length - 1].Day !== DAYSINWEEK[6].value)
    {
      let currentDate = 0;
      for(let i = 0; i < DAYSINWEEK.length; i++)
      {
        if(result[result.length - 1].Day === DAYSINWEEK[i].props)
          currentDate = DAYSINWEEK[i].value;
      }

      for(let i = currentDate; i < DAYSINWEEK[6].value; i++)
        result.push({ Day: DAYSINWEEK[i].props, Date: ""})
      
    }
    
    return result;
}

const PopulateDates = (data) => (
  <View>
    <FlatList
      data={GetDates().slice(0,7)}
      contentContainerStyle={styles.List}
      renderItem={({item}) => 
        <TouchableOpacity style={styles.box}>
          <Text style={styles.Text}> 
            {item.Date}
          </Text>
        </TouchableOpacity>}
    />
    <FlatList
      data={GetDates().slice(7,14)}
      contentContainerStyle={styles.List}
      renderItem={({item}) => 
        <TouchableOpacity style={styles.box}>
          <Text style={styles.Text}> 
            {item.Date}
          </Text>
        </TouchableOpacity>}
    />
    <FlatList
      data={GetDates().slice(14,21)}
      contentContainerStyle={styles.List}
      renderItem={({item}) => 
        <TouchableOpacity style={styles.box}>
          <Text style={styles.Text}> 
            {item.Date}
          </Text>
        </TouchableOpacity>}
    />
    <FlatList
      data={GetDates().slice(21,28)}
      contentContainerStyle={styles.List}
      renderItem={({item}) => 
        <TouchableOpacity style={styles.box}>
          <Text style={styles.Text}> 
            {item.Date}
          </Text>
        </TouchableOpacity>}
    />
    <FlatList
      data={GetDates().slice(28)}
      contentContainerStyle={styles.List}
      renderItem={({item}) => 
        <TouchableOpacity style={styles.box}>
          <Text style={styles.Text}> 
            {item.Date}
          </Text>
        </TouchableOpacity>}
    />
  </View>
)

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
    },
    box: {
      width: Constant.MAX_WIDTH * 0.8 / 7,
      height: Constant.MAX_HEIGHT * 0.3 / 6,
      backgroundColor: '#EBEBEB',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
    },
});