import React from 'react';
import { Portal, ActivityIndicator, useTheme } from 'react-native-paper';
import { StyleSheet, Modal, View } from 'react-native';
import CustomText from './CustomText';
import { resFont } from '../utils/utils';

const Loader = props => {
    const { colors } = useTheme()
    const { isLoading, backgroundColor } = props;
    return (
        <Modal visible={isLoading} transparent={true}>
            <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ height: 150, width: 150, alignSelf: 'center', backgroundColor: 'rgba(0,0,0, 0.5)', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>

                    <ActivityIndicator size={'large'} animating={true} color={colors.primary} />
                    <CustomText style={{ textAlign: 'center', fontFamily: 'Baloo-bold', marginTop: 10, fontSize: resFont(13), color: 'white' }}>{props.children}</CustomText>
                </View>
            </View>
        </Modal>
    )
}

export default Loader