import {Dimensions, Platform} from 'react-native';

export const screenWidth: number = Dimensions.get('window').width;
export const screenHeight: number = Dimensions.get('window').height;
export const NOTICE_HEIGHT: number =
  Platform.OS === 'ios' ? screenHeight * 0.13 : screenHeight * 0.07;
