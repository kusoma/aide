import React from 'react';
import { StyleSheet, FlatList, Text, View, ScrollView } from 'react-native';
import { WeeklyButton } from './Buttons';
import { Constant } from '../utils/Variables';

const COLORS = [ '#C72400', '#E3640D', '#5B9E05', '#1e90ff', '#ffdf00', '#b19cd9', '#000' ];
const MONTHNAME = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
const YEAR = new Date().getFullYear();
const MONTH = new Date().getMonth() + 1;
const DAY = new Date().getDate();
const HOUR = new Date().getHours();

const CreateList = ({ data, count }) => (
	<FlatList
		data={data}
		renderItem={({ item }) => (
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<View style={styles.grayBar} />
				<WeeklyButton timeLabel={getTimeLabel(item.time)} classLabel={item.course} titleLabel={item.title} color={COLORS[count++]} />
			</View>
		)}
	/>
);

const getTimeLabel = data => {
	const year = Number(data.slice(0, 4));
	const month = Number(data.slice(5, 7));
	const day = Number(data.slice(8));
	const hour = Number(data.slice(11, 13));

	if (YEAR === year && MONTH === month && DAY === day) {
		if (hour === HOUR) return 'in less than hour';
		if (hour + 1 === HOUR) return 'in an Hour';
		if (hour + 2 === HOUR) return 'in 2 Hour';
	} else if (hour < 12) return `${hour}AM`;
	else return `${hour - 12}PM`;
};
const getDataSet = data => {
	let dates = [];
	let results = [];
	data.forEach(({ end }) => {
		dates.push(end.slice(0, 10));
	});

	dates = new Set(dates);
	dates.forEach(i => {
		results.push({
			date: i,
			data: [],
		});
	});

	for (let x = 0; x < results.length; x++) {
		data.forEach(i => {
			if (i.end.slice(0, 10) === results[x].date) {
				results[x].data = [ ...results[x].data, { course: i.course, title: i.title, time: i.end, isQuiz: i.isQuiz } ];
			}
		});
	}
	return results;
};

const getDate = data => {
	const year = Number(data.date.slice(0, 4));
	const month = Number(data.date.slice(5, 7));
	const day = Number(data.date.slice(8));

	if (YEAR === year && MONTH === month && DAY === day) return 'Today';
	if (YEAR === year && MONTH == month && DAY + 1 === day) return `Tomorrow, ${MONTHNAME[month - 1]} ${day}`;
	if (YEAR === year && MONTH == month && DAY - 1 === day) return `Yesturday, ${MONTHNAME[month - 1]} ${day}`;
	else return `${MONTHNAME[month - 1]} ${day}`;
};

export const WeeklyViewList = ({ data }) => (
	<ScrollView>
		<FlatList
			data={getDataSet(data)}
			contentContainerStyle={styles.List}
			renderItem={({ item }) => (
				<View style={{ marginBottom: 6 }}>
					<View style={{ flexDirection: 'row' }}>
						<View style={styles.redCircle} />
						<Text style={[ { marginTop: 10, marginLeft: 20 }, styles.textStyle ]}> {getDate(item)} </Text>
					</View>
					{item.data ? <CreateList data={item.data} count={0} /> : <React.Fragment />}
				</View>
			)}
		/>
	</ScrollView>
);

const styles = StyleSheet.create({
	textStyle: {
		fontFamily: 'SF_Pro_Bold',
		fontWeight: '900',
		letterSpacing: 0.5,
		fontSize: 26,
		marginTop: -3,
	},
	grayBar: {
		width: Constant.MAX_WIDTH * 0.02,
		height: Constant.MAX_HEIGHT * 0.125,
		backgroundColor: '#D9D9D9',
		marginRight: 25,
	},
	redCircle: {
		marginLeft: -12,
		marginBottom: 10,
		borderRadius: 100,
		width: Constant.MAX_WIDTH * 0.08,
		height: Constant.MAX_WIDTH * 0.08,
		backgroundColor: '#B21B1B',
	},
	List: {
		flexDirection: 'column',
		width: Constant.MAX_WIDTH,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
