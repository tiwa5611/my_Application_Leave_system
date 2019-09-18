import React, {
	Component,
} from 'react';
import {
	Animated,
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableHighlight,
	View
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

const data = [
    {id: 40, leave_type: "ลาป่วย", leave_date: "30 ธันวาคม 2562 - 01 มกราคม 2563", leave_desc: "dddd", status: "Approved"},
    {id: 59, leave_type: "ลาพักร้อน", leave_date: "22 กันยายน 2562", leave_desc: "yyyy", status: "Send to approve"},
    {id: 58, leave_type: "ลากิจ", leave_date: "20 กันยายน 2562", leave_desc: "ttttt", status: "Send to approve"},
    {id: 57, leave_type: "ลาป่วย", leave_date: "15 กันยายน 2562", leave_desc: "เล่นน้ำ", status: "Approved"},
    {id: 44, leave_type: "ลาพักร้อน", leave_date: "12 กันยายน 2562", leave_desc: "เทส", status: "Send to approve"},
    {id: 39, leave_type: "ลากิจ", leave_date: "27 สิงหาคม 2562 - 28 สิงหาคม 2562", leave_desc: "fff", status: "Send to approve"},
    {id: 38, leave_type: "ลากิจ", leave_date: "13 พฤษภาคม 2562", leave_desc: "ไปเที่ยวป่าดงสุข", status: "Send to approve"},
    {id: 28, leave_type: "ลากิจ", leave_date: "01 พฤษภาคม 2562", leave_desc: "hhh", status: "Approved"},
]

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listType: 'FlatList',
			dataSource: '',
			listViewData : ''
        };
		//data.fill(...data).map((data, i) => ({key: `${i}`, type : data})),
		this.rowSwipeAnimatedValues = {};	
		{console.log('state', this.rowSwipeAnimatedValues)}
		data.fill(...data).forEach((_, i) => {
			this.rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
		});
	}

	componentDidMount() {
		this.fetchDataApi();
	}

	fetchDataApi = async () => {
		console.log('token',JSON.parse(await AsyncStorage.getItem('user_token')))
		// fetch('http://leave.greenmile.co.th/api/get_leave')
		fetch('http://10.0.2.2:8000/api/get_leave', {
		  method: 'POST',
		  headers: {
			Accept: 'application/json',
			'Content-Type' : 'application/json'
		  },
		  body: JSON.stringify({
			'token': JSON.parse(await AsyncStorage.getItem('user_token')),
		  })
		})
		.then((response) => response.json())
		.then((responseJson) => {
			this.setState({
			  isloading : false,
			  listViewData : responseJson.data.fill(...responseJson.data).map((value, i) => ({key: `${i}`, type : value}))
			})
		})
		.catch((error) => {
		  console.error(error);
		});
	  }

	closeRow(rowMap, rowKey) {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
	}

	deleteRow(rowMap, rowKey) {
		this.closeRow(rowMap, rowKey);
		const newData = [...this.state.listViewData];
		const prevIndex = this.state.listViewData.findIndex(item => item.key === rowKey);
		newData.splice(prevIndex, 1);
		this.setState({listViewData: newData});
	}

	deleteSectionRow(rowMap, rowKey) {
		this.closeRow(rowMap, rowKey);
		var [section, row] = rowKey.split('.');
		const newData = [...this.state.sectionListData];
		const prevIndex = this.state.sectionListData[section].data.findIndex(item => item.key === rowKey);
		newData[section].data.splice(prevIndex, 1);
		this.setState({sectionListData: newData});
	}

	onRowDidOpen = (rowKey, rowMap) => {
		console.log('This row opened', rowKey);
	}

	onSwipeValueChange = (swipeData) => {
		const { key, value } = swipeData;
		this.rowSwipeAnimatedValues[key].setValue(Math.abs(value));
	}

	render() {
		// this.fetchDataApi();
		return (
			<View style={styles.container}>
				{console.log('ListViewData ------>', this.state.listViewData)}
				{console.log('DataSource  ------>', this.state.dataSource)}
                <SwipeListView
                    data={this.state.listViewData}
                    renderItem={ (data, rowMap) => (
                        <TouchableHighlight
                            onPress={ _ => console.log('You touched me') }
                            style={styles.rowFront}
                            underlayColor={'#AAA'}
                        >
                            <View>
                                <Text>I am {data.item.type.leave_date} in a SwipeListView</Text>
                            </View>
                        </TouchableHighlight>
                    )}
                    renderHiddenItem={ (data, rowMap) => (
                        <View style={styles.rowBack}>
                            <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={ _ => this.closeRow(rowMap, data.item.key) }>
                                <Text style={styles.backTextWhite}>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this.deleteRow(rowMap, data.item.key) }>
                                <Animated.View
                                    style={[
                                        styles.trash,
                                        {

                                            transform: [
                                                {
                                                    scale: this.rowSwipeAnimatedValues[data.item.key].interpolate({
                                                        inputRange: [45, 90],
                                                        outputRange: [0, 1],
                                                        extrapolate: 'clamp',
                                                    }),
                                                }
                                            ],
                                        }
                                    ]}
                                >
                                    <Image source={require('../images/favicon.png')} style={styles.trash} />
                                </Animated.View>
                            </TouchableOpacity>
                        </View>
                    )}
                    rightOpenValue={-150}
                    previewRowKey={'0'}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                    onSwipeValueChange={this.onSwipeValueChange}
                />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1
	},
	standalone: {
		marginTop: 30,
		marginBottom: 30,
	},
	standaloneRowFront: {
		alignItems: 'center',
		backgroundColor: '#CCC',
		justifyContent: 'center',
		height: 50,
	},
	standaloneRowBack: {
		alignItems: 'center',
		backgroundColor: '#8BC645',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 15
	},
	backTextWhite: {
		color: '#FFF'
	},
	rowFront: {
		alignItems: 'center',
		backgroundColor: '#CCC',
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		justifyContent: 'center',
		height: 50,
	},
	rowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75
	},
	backRightBtnLeft: {
		backgroundColor: 'blue',
		right: 75
	},
	backRightBtnRight: {
		backgroundColor: 'red',
		right: 0
	},
	controls: {
		alignItems: 'center',
		marginBottom: 30
	},
	switchContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 5
	},
	switch: {
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'black',
		paddingVertical: 10,
		width: Dimensions.get('window').width / 4,
	},
	trash: {
		height: 25,
		width: 25,
	}
});

export default App;