import React from 'react';
import Navigation from './src/navigation/Navigation';
import {LogBox} from 'react-native';

const App = () => {
  LogBox.ignoreAllLogs();
  return <Navigation />;
};

export default App;
