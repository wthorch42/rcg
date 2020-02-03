import React from 'react';
import classes from './Person.css';
import Aux from '../../../hoc/Auxilliary';
import withClass from '../../../hoc/withClass';
import PropTypes from 'prop-types';

class Person extends React.Component {

    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }

    componentDidMount() {
        this.inputElementRef.current.focus();
    }

    render() {
        console.log('[Person.js] rendering...');
        return (
            <Aux>
                <p>{ this.props.isAuth ? "Authenticated!" : "Please Log In"}</p>
                <p onClick = { this.props.click }>I'm { this.props.name } and I'm { this.props.age } years old!</p>
                <p>{ this.props.children }</p>
                <input ref={ this.inputElementRef } type="text" onChange={ this.props.changed } defaultValue={ this.props.name }/>
            </Aux>
        );
    };
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
}

export default withClass(Person, classes.Person);