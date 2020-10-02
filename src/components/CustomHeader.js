import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import CustomText from './CustomText';
import { resFont } from '../utils/utils';
import { Appbar } from 'react-native-paper';


const CustomHeader = props => {
    const {title, leftIcon, rightIcon, titleStyle, onLeftPress, onRightPress} = props
    return (
       <Appbar.Header statusBarHeight={StatusBar.currentHeight} style={{ backgroundColor: 'transparent', elevation: 0 }}>
                        <Appbar.Action icon={leftIcon} onPress={onLeftPress}
                        />
                        <Appbar.Content
                            titleStyle={[{...titleStyle}, {textAlign: 'center'}]}
                            title={title}
                        />
                        <Appbar.Action icon={rightIcon} onPress={onRightPress}
                        />
                    </Appbar.Header>
    )
}

export default CustomHeader;


CustomHeader.propTypes = {
    leftIcon: PropTypes.string,
    rightIcon: PropTypes.string,
    onLeftPress: PropTypes.func,
    onRightPress: PropTypes.func,
    title: PropTypes.string,
    titleStyle: PropTypes.object,
}