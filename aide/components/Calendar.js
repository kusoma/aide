import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Constant } from '../utils/Variables'

const COLORS = [
  '#E86F0F',
  '#39BE50',
  '#088DF8',
  '#A41AB0',
]

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

const getEventsDates = ({ data }) => {
  if(!data[0])
    return;

  const results = [];
  let hash = {};
  
  data.forEach(i => {
    const date = i.end.slice(0,10);
    
    if(hash[date])
      results[results.length - 1].count++;

    else {
      const Month = date.slice(5,7);
      const Day = date.slice(8,10);
      
      let count = 1;    
      hash[date] =  { month: Month, day: Day, count };
      results.push({ month: Month, day: Day, count })
    }
  })
  return results;
}

const GetDates = ( data ) => {
    
    const year = new Date().getFullYear();
    const currentmonth = new Date().getMonth();
    const date = new Date(year, currentmonth, 1);
    const events = getEventsDates(data);
    const result = [];
    const today = new Date().getDate();

    if(date.getDay() !== 0)
        for(let i = 0; i < date.getDay() ; i++)
          result.push({ Day: DAYSINWEEK[i].props, Date: "", Assignments: 0, ActiveDay: false})
    
    while (date.getMonth() === currentmonth) { 
         const temp = {};
         temp.Day = DAYSINWEEK[date.getDay()].props;
         temp.Date = date.getDate()
         temp.Assignments = 0;
         temp.ActiveDay= false;

         if(temp.Date == today)
           temp.ActiveDay = true;

         if(events) {
          events.forEach((i) => {
            if(i.day == temp.Date && i.month == currentmonth + 1)
              temp.Assignments = i.count;
          })
         }
         result.push(temp);
         date.setDate(date.getDate() + 1);
    }

    if(result[result.length - 1].Day !== DAYSINWEEK[6].value)
    {
      let currentDate = 0;
      for(let i = 0; i < DAYSINWEEK.length; i++)
        if(result[result.length - 1].Day === DAYSINWEEK[i].props)
          currentDate = DAYSINWEEK[i].value;
      for(let i = currentDate; i < DAYSINWEEK[6].value; i++)
        result.push({ Day: DAYSINWEEK[i].props, Date: ""})
    }
    return result;
  }

const populateAssignments = (data) => {
  if(!data)
  return;

    if( data.Day === DAYSINWEEK[1].props
      || data.Day === DAYSINWEEK[3].props
      || data.Day === DAYSINWEEK[5].props
    ) 
      {
        if(data.Assignments >= 2) {
          return (
            <View style={styles.AssignmentsContainer}>
              <View style={[styles.Assignments, { backgroundColor: COLORS[0]}]}/>
              <View style={[styles.Assignments, { backgroundColor: COLORS[2]}]}/>
            </View>
          )
        }
        if(data.Assignments == 1)
        {
          return (
            <View style={styles.AssignmentsContainer}>
              <View style={[styles.Assignments, { backgroundColor: COLORS[0]}]}/>
            </View>
          )
        }
      }
      else if(data.Day === DAYSINWEEK[2].props
        || DAYSINWEEK[4].props
        || DAYSINWEEK[6].props
        || DAYSINWEEK[0].props)
      {
        if(data.Assignments >= 2) {
          return (
            <View style={styles.AssignmentsContainer}>
              <View style={[styles.Assignments, { backgroundColor: COLORS[1]}]}/>
              <View style={[styles.Assignments, { backgroundColor: COLORS[3]}]}/>
            </View>
          )
        }
        if(data.Assignments == 1) {
          return (
            <View style={styles.AssignmentsContainer}>
              <View style={[styles.Assignments, { backgroundColor: COLORS[1]}]}/>
            </View>
          )
        }
      }
}

const PopulateDates = (data) => (
  <View>
    <FlatList
      data={GetDates(data).slice(0,7)}
      contentContainerStyle={styles.List}
      renderItem={({item}) => 
        <TouchableOpacity style={styles.box}>
        {item.ActiveDay?
          <View style={styles.ActiveDay}>
            <Text style={styles.Text}> 
            {item.Date}
            </Text>
          </View>
          :
          <Text style={styles.Text}> 
          {item.Date}
          </Text>
        }
        <View style={{position: 'absolute', top: 37}}>
          {populateAssignments(item)}
        </View>
        </TouchableOpacity>}
    />
    <FlatList
      data={GetDates(data).slice(7,14)}
      contentContainerStyle={styles.List}
      renderItem={({item}) => 
        <TouchableOpacity style={styles.box}>
        {item.ActiveDay?
          <View style={styles.ActiveDay}>
            <Text style={styles.Text}> 
            {item.Date}
            </Text>
          </View>
          :
          <Text style={styles.Text}> 
          {item.Date}
          </Text>
        }
        <View style={{position: 'absolute', top: 37}}>
          {populateAssignments(item)}
        </View>
        </TouchableOpacity>}
    />
    <FlatList
      data={GetDates(data).slice(14,21)}
      contentContainerStyle={styles.List}
      renderItem={({item}) => 
        <TouchableOpacity style={styles.box}>
        {item.ActiveDay?
          <View style={styles.ActiveDay}>
            <Text style={styles.Text}> 
            {item.Date}
            </Text>
          </View>
          :
          <Text style={styles.Text}> 
          {item.Date}
          </Text>
        }
        <View style={{position: 'absolute', top: 37}}>
          {populateAssignments(item)}
        </View>
        </TouchableOpacity>}
    />
    <FlatList
      data={GetDates(data).slice(21,28)}
      contentContainerStyle={styles.List}
      renderItem={({item}) => 
        <TouchableOpacity style={styles.box}>
        {item.ActiveDay?
          <View style={styles.ActiveDay}>
            <Text style={styles.Text}> 
            {item.Date}
            </Text>
          </View>
          :
          <Text style={styles.Text}> 
          {item.Date}
          </Text>
        }
        <View style={{position: 'absolute', top: 37}}>
          {populateAssignments(item)}
        </View>
        </TouchableOpacity>}
    />
    <FlatList
      data={GetDates(data).slice(28)}
      contentContainerStyle={styles.List}
      renderItem={({item}) => 
        <TouchableOpacity style={styles.box}>
        {item.ActiveDay?
          <View style={styles.ActiveDay}>
            <Text style={styles.Text}> 
            {item.Date}
            </Text>
          </View>
          :
          <Text style={styles.Text}> 
          {item.Date}
          </Text>
        }
        <View style={{position: 'absolute', top: 37}}>
          {populateAssignments(item)}
        </View>
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
      borderRadius: 10,
    },
    AssignmentsContainer: {
      flexDirection: 'row'
    },
    Assignments: { 
      width: 5,
      height: 5,
      borderRadius: 5,
      padding: 3,
    },
    ActiveDay: {
      width: Constant.MAX_HEIGHT * 0.03,
      height: Constant.MAX_HEIGHT * 0.03,
      borderRadius: 50,
      backgroundColor: '#BC0909',
      justifyContent: 'center',
      alignItems: 'center',
    }
});