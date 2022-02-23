import React, { useState, useEffect, useReducer } from "react";
import { emailReducer, passwordReducer } from "../../Store";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

interface LoginProps {
  onLogin: (a: string, b: string) => void;
}

const Login = (props: LoginProps) => {
  const [emailState, dispathEmail] = useReducer(emailReducer, {
    enteredEmail: "",
    emailIsValid: false,
  });

  const [passwordState, dispathPassword] = useReducer(passwordReducer, {
    enteredPassword: "",
    passwordIsValid: false,
  });

  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState<boolean>();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState<boolean>();
  const [formIsValid, setFormIsValid] = useState(false);
  const { passwordIsValid } = passwordState;
  const { emailIsValid } = emailState;
  
  useEffect(() => {
    console.log("Use effect");
    const checkForValidity = setTimeout(() => {
      console.log("checking for validity");
      setFormIsValid(passwordIsValid && emailIsValid);
    }, 500);
    const cleanup = () => {
      console.log("Claen Up");
      clearTimeout(checkForValidity);
    };
    return cleanup;
  }, [passwordIsValid, emailIsValid]);

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispathEmail({ type: "USER_INPUT", value: event.target.value });
    //setEnteredEmail(event.target.value);
    //setFormIsValid(emailState.emailIsValid && passwordState.passwordIsValid)
  };

  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispathPassword({ type: "USER_INPUT", value: event.target.value.trim() });
    //setEnteredPassword(event.target.value);
    //setFormIsValid(emailState.emailIsValid && passwordState.passwordIsValid)
  };

  const validateEmailHandler = () => {
    dispathEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispathPassword({ type: "INPUT_BLUR" });
    //setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    props.onLogin(emailState.enteredEmail, passwordState.enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            !emailState.emailIsValid ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            !passwordState.passwordIsValid ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
