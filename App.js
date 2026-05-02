import React from 'react';
import { Provider } from 'react-redux';
import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Splash from './components/Splash';
import store from './store/Store';
import Fire from './lib/Fire';
import { ignoreWarnings } from './utils/Warnings';

enableScreens();
ignoreWarnings();

class App extends React.Component {
  async componentDidMount() {
    await new Fire();
  }

  render() {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <Splash />
        </Provider>
      </GestureHandlerRootView>
    );
  }
}

export default App;
