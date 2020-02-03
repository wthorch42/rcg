import React from 'react';
import Person from './Person/Person';

class Persons extends React.Component {

    state = {};

    static getDerivedStateFromProps(props, state) {
        console.log('[Persons.js] getDerivedStateFromProps');
        return state;
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[Persons.js] shouldComponentUpdate');
        return (this.props.persons !== nextProps.person ||
                this.props.isAuthenticated !== nextProps.isAuthenticated);
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[Persons.js] getSnapshotBeforeUpdate');
        return { message: 'Snapshot!' };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Persons.js] componentDidUpdate: \'' + snapshot.message + '\'');
    }

    componentWillUnmount() {
        console.log('[Persons.js] componentWillUnmount');
    }

    render() {
    console.log('[Persons.js] rendering...');
    return this.props.persons.map((person, index) => 
        <Person 
            key={ person.id } 
            click={ () => this.props.deleteHandler(person.id) }
            changed={ (event) => this.props.nameChangeHandler(event, person.id) }
            name={ person.name } 
            age={ person.age }>{ person.hobbies }</Person>
        )
    }
}
export default Persons;
