import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../Styles/SignupPage.css";

// Components
import Navbar from "../Components/Navbar";
import Copyright from "../Components/Copyright";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

// Icons
import { FiLock } from "react-icons/fi";
import { Fragment } from "react";

const styles = {
  paper: {
    display: "flex",
    height: "90vh",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    marginBottom: "0.5rem",
    backgroundColor: "#333333",
  },

  submit: {
    margin: "auto",
    marginTop: "1rem",
    marginBottom: "1rem",
    backgroundColor: "#333333",
    "&:hover": {
      backgroundColor: "#333333",
    },
  },
};

export class SignupPage extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    // Todo: on Submit logic here
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Navbar />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <FiLock />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className="form" onSubmit={this.handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstname"
              label="First Name"
              name="firstname"
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="Last Name"
              name="lastname"
              onChange={this.handleChange}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={this.handleChange}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              onChange={this.handleChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>
          <div className="footer">
            <Typography variant="caption">
              <Link to="/login">Already have an Account? Login here. </Link>
            </Typography>
          </div>
          <Copyright />
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(SignupPage);
