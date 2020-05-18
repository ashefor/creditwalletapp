import React from 'react';
import { Modal, Portal, ActivityIndicator, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const Loader = props => {
    const {colors} = useTheme()
    const { isLoading, backgroundColor } = props;
    return (
        <Portal>
            <Modal contentContainerStyle={[StyleSheet.absoluteFill, {backgroundColor: backgroundColor ? backgroundColor: '#f7f7f7'}]} dismissable={false} visible={isLoading}>
                <ActivityIndicator animating={true} color={colors.primary} />
            </Modal>
        </Portal>
    )
}

export default Loader