import React, { Component } from 'react';
import {database} from './firebase';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      newData: ''  
    };
    

    this.dataRef = null;

    this.handleChange = this.handleChange.bind(this);
    this.HandleSubmit = this.HandleSubmit.bind(this);
  }

  componentDidMount() {
    this.dataRef = database.ref('/WOW/lol');
    this.dataRef.once('child_added', (snapshot) => {
      console.log("child added", snapshot.val());
      // console.log('data changed', snapshot.val());
      // console.log('hellou!!');
      this.setState({
        data: snapshot.val()
      });
    });
  }


  // When input field changes, change State of newData to the value of input and update the input field
  handleChange(event) {
    const newData = event.target.value;
    this.setState({
      newData
    });
  }

  HandleSubmit(event) {
    // Preventing browser from default behavior with <form>
    event.preventDefault();
    this.dataRef.push(this.state.newData);
  }

  render() {
    return (
      <div className="App">
        <div className="App--header">
          <h2>Welcome to React and Firebase App</h2>
        </div>
        <pre className="App--data">
          { JSON.stringify(this.state.data, null, 2) }
        </pre>
        <form className="App--form" onSubmit={this.HandleSubmit}>
          <input type="text" value={this.state.newData} onChange={this.handleChange} />
          <input type="submit" /> 
        </form>
      </div>
    );
  }
}

export default App;
