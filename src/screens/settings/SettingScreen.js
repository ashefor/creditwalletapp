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
import { Divider, List, Appbar } from 'react-native-paper';
import { Constants } from 'react-native-unimodules';

class SettingScreen extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
                 <Appbar.Header style={{ backgroundColor: 'white', elevation: 0 }}>
                    <Appbar.BackAction
                    />
                    <Appbar.Content
                        titleStyle={{ textAlign: 'center', fontFamily: 'Baloo-med' }}
                        title="Settings"
                    />
                    <Appbar.Action
                        />
                </Appbar.Header>
                <ScrollView contentContainerStyle={{ flexGrow: 1, alignSelf: 'center', width: resWidth(95) }}>
                    <List.Item
                        onPress={() => this.props.navigation.navigate('Change Password')}
                        title="Change password"
                        titleStyle={{fontFamily: 'Baloo-med', fontSize: resFont(15)}}
                        left={props => <List.Icon {...props} icon="lock" />}
                        right={props => <List.Icon {...props} icon="arrow-right" />}
                    />
                    <Divider />
                    <List.Item
                        title="Sign Out" titleStyle={{fontFamily: 'Baloo-med', fontSize: resFont(15)}}
                        onPress={() => this.props.navigation.navigate('Auth')}
                        left={props => <List.Icon {...props} icon="exit-to-app" color={'red'} />}
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