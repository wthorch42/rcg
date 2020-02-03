import React, { useEffect, useRef, useContext } from 'react';
import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {

    const toggleButtonRef = useRef(null);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        toggleButtonRef.current.click();
        return (() => {
            console.log('[Cockpit.js] useEffect unmount function');
        })
    }, [])

    useEffect(() => {
        console.log('[Cockpit.js] useEffect 2');
    }, [props.personsLength])

    let assignedClasses = props.personsLength <= 1 ? [classes.red, classes.bold] : props.personsLength <= 2 ? [classes.red] : [];

    let buttonClasses = props.showPersons ? [classes.Button, classes.Red] : [classes.Button];

    return (
        <div className={ classes.Cockpit }>
            <h1>{ props.title }</h1>
            <p className={ assignedClasses.join(' ') }>This is really working!</p>
            <button ref={ toggleButtonRef } className={ buttonClasses.join(' ') } onClick={ props.toggleHandler }>Toggle Persons</button>
            <button className={ classes.Button } onClick={ authContext.login }>Log in</button>
        </div>
    );
}

export default React.memo(cockpit);