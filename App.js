/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import InitialNavigation from './src/container/navigations/InitialNavigation';
// Redux  Store Connect
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <InitialNavigation />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
