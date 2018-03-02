import * as React from 'react';
import './App.css';
import AppContainer from './container/AppContainer';

const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
        <div>
            <AppContainer/>
      </div>
    );
  }
}

export default App;
