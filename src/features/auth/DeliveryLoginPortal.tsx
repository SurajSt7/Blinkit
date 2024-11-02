import React from 'react';
import {Button, SafeAreaView, StyleSheet, View} from 'react-native';
import {goBack} from '../../utils/NavigationUtils';

const DeliveryLogin: React.FC = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Button title="GO BACK" onPress={() => goBack()} />
    </SafeAreaView>
  );
};

export default DeliveryLogin;

const styles = StyleSheet.create({});
