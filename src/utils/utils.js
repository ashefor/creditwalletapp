import { isIphoneX } from "react-native-iphone-x-helper";
import { Platform, StatusBar, Dimensions } from "react-native";
import { banks } from "./banks";

export const { width, height } = Dimensions.get("window");

const deviceHeight = isIphoneX()
    ? height - 78 // iPhone X style SafeAreaView size in portrait
    : Platform.OS === "android"
    ? height - StatusBar.currentHeight
    : height;

const responsiveHeight = h => {
    const { height } = Dimensions.get("window");
    return height * (h / 100);
};

const responsiveWidth = w => {
    const { width } = Dimensions.get("window");
    return width * (w / 100);
};

const RFValue = fontSize => {
    // guideline height for standard 5" device screen
    const standardScreenHeight = 680;
    const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
    return Math.round(heightPercent);
};

const retrieveBankCode = bankName => {
    const foundBank = banks.find(bank => bank.name.toLowerCase() === bankName);
    return foundBank.bankcode;
}

export const resFont = val => RFValue(val);
export const resHeight = val => responsiveHeight(val);
export const resWidth = val => responsiveWidth(val);
export const getBankCode = val =>  retrieveBankCode(val);
