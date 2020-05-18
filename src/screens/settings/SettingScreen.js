import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Platform } from 'react-native'
import { SafeAreaView } from 'react-navigation';
import CustomText from '../../components/CustomText';
import { ScrollView } from 'react-native-gesture-handler';
import {
    Ionicons, Entypo, FontAwesome5,
    Foundation, AntDesign, MaterialIcons
} from '@expo/vector-icons';
import { resWidth, resFont, resHeight } from '../../utils/utils';
import { Divider, List } from 'react-native-paper';
import { Constants } from 'react-native-unimodules';

class SettingScreen extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, alignSelf: 'center', width: resWidth(90), marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : resHeight(2) }}>
                    <List.Item
                        onPress={() => this.props.navigation.navigate('Change Password')}
                        title="Change password"
                        left={props => <List.Icon {...props} icon="lock" />}
                        right={props => <List.Icon {...props} icon="arrow-right" />}
                    />
                    <Divider />
                    <List.Item
                        title="Sign Out"
                        onPress={() => this.props.navigation.navigate('Auth')}
                        left={props => <List.Icon {...props} icon="exit-to-app" color={'red'} />}
                        right={props => <List.Icon {...props} icon="arrow-right" />}
                    />
                    {/* <Divider/> */}
                    {/* <TouchableWithoutFeedback onPress={()=> this.props.navigation.navigate('Auth')} style={{paddingHorizontal: 10}}>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',  paddingVertical: 10}}>
                           <View style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
                           <AntDesign name='logout' size={25} color='red'/>
                            <CustomText style={{marginHorizontal: 10, fontSize: resFont(15), fontFamily: 'Baloo', color: 'red' }}>Sign Out</CustomText>
                           </View>
                        </View>
                    </TouchableWithoutFeedback> */}
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default SettingScreen