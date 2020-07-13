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
import { signOut } from '../../utils/storage';
import CustomSafeAreaView from '../../components/CustomSafeAreaView';

class SettingScreen extends Component {

    _handleSignOut = () => {

    }
    render() {
        return (
            <CustomSafeAreaView style={{flex: 1, backgroundColor: '#f5fcff'}}>
                 <Appbar.Header style={{ backgroundColor: '#f5fcff', elevation: 0 }}>
                    
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
                        onPress={() => signOut()}
                        left={props => <List.Icon {...props} icon="exit-to-app" color={'red'} />}
                    />
                </ScrollView>
            </CustomSafeAreaView>
        )
    }
}

export default SettingScreen