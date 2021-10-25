import React, { useState,useRef } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import classes from './AddUser.module.css';

const AddUser = props => {
    //const [enteredUserName, setenteredUserName] = useState('');
    //const [enteredAge, setenteredAge] = useState('');
    const [error, setError] = useState();

    const enteredUserNameRef = useRef();
    const enteredAgeRef = useRef();

    const addUserHandler = (event) => {
        event.preventDefault();

        const enteredUserName = enteredUserNameRef.current.value;
        const enteredAge = enteredAgeRef.current.value;

        if (enteredUserName.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: 'Invalid Input',
                message: 'Please enter a valid name and age'
            })
            return;
        }

        if (+enteredAge < 1) {

            setError({
                title: 'Invalid Age',
                message: 'Please enter a valid age ( > 0)'
            })
        }

        props.onAddUser(enteredUserName, enteredAge);

        enteredUserNameRef.current.value ='';
        enteredAgeRef.current.value ='';

        // setenteredUserName('');
        // setenteredAge('');
    }

    // const usernameChangeHandler = (event) => {
    //     setenteredUserName(event.target.value);
    // }

    // const ageChangeHandler = (event) => {

    //     setenteredAge(event.target.value);
    // }

    const errorHandler = () =>{
        setError(null);
    }
    return (
        <div>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} ></ErrorModal>}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input ref={enteredUserNameRef} id="username" type="text" />

                    <label htmlFor="age">Age (Years)</label>
                    <input ref={enteredAgeRef} id="age" type="number" />

                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </div>
    )

};

export default AddUser;