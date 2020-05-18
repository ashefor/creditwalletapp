import React from 'react';
import {Text} from 'react-native';

const CustomText = props => {
    const {children, style} = props
    return (
        <Text allowFontScaling={false} style={[{...style}]}>
            {children}
        </Text>
    )
}

export default CustomText;