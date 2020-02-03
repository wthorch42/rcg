import React from 'react';
import classes from './App.css';
import Cockpit from '../components/Cockpit/Cockpit';
import Persons from '../components/Persons/Persons';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Auxilliary';
import uuid from 'uuid';

class App extends React.Component {

  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
    this.state = {
      persons: [
        { name: 'Fred', age: 29, id: uuid() },
        { name: 'Jane', age: 28, hobbies: 'I like skydiving!', id: uuid() },
        { name: 'Tommy', age: 26, id: uuid() }
      ],
      showPersons: false,
      showCockpit: true,
      changeCounter: 0,
      authenticated: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[App.js] componentDidUpdate: \'' + snapshot.message + '\'');

  }

  getSnapshotBeforeUpdate() {
    console.log('[App.js] getSnapshotBeforeUpdate');
    return { message: '[App.js] Snapshot'};
  }

  nameChangedHandler = (event, personID) => {
    const persons = [...this.state.persons];
    persons.find( ({ id }) => id === personID ).name = event.target.value;
    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      }
    })
  }

  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons
    });
  }

  deletePersonHandler = (personID) => {
    const newPersons = this.state.persons.filter((person) => person.id !== personID);
    this.setState({persons: newPersons});
  }

  loginHandler = () => {
    console.log('loginHandler()');
    this.setState({ authenticated: true });
  }

  render() {
    console.log('[App.js] render');

    let persons = "";

    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={ this.state.persons }
          deleteHandler={ this.deletePersonHandler }
          nameChangeHandler={ this.nameChangedHandler } 
          isAuthenticated={ this.state.authenticated }/>
      )
    }

    let cockpit = "";

    if (this.state.showCockpit) {
      cockpit = (
        <Cockpit 
            title={ this.props.appTitle }
            personsLength={ this.state.persons.length }
            toggleHandler={ this.togglePersonsHandler }
            showPersons={ this.state.showPersons }
            login={ this.loginHandler } />
      );
    }

    return (
        <Aux>
          <button onClick={ () => { this.setState({ showCockpit: !this.state.showCockpit }) } }>Toggle Cockpit</button>
          { cockpit }
          { persons }
        </Aux>
    );
  }
}

export default withClass(App, classes.App);
