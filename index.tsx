import React, { Component } from 'react';
import { render } from 'react-dom';
import DropdownCSV from './components/dropdownCSV';
import './style.css';

interface AppProps {}
interface AppState {
  name: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
    };
  }

  render() {
    return (
      <div>
        <DropdownCSV />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
