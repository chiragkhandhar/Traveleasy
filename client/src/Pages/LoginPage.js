import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../Styles/LoginPage.css";

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
  },
};

export class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    err: "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const body = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("/api/user/login", body)
      .then((res) => {
        if (res.data.message === "Login Successfull") {
          localStorage.setItem("token", res.data.accessToken);
          this.props.history.push("/");
        } else if (res.data.message === "Invalid Password") {
          localStorage.clear();
          alert("Invalid Password");
        }
      })
      .catch((res) => {
        this.setState({
          err: res.data,
        });
        alert(res.data);
      });
  };
  render() {
    const { classes } = this.props;
    const err = this.state.err;

    return (
      <Fragment>
        <Navbar />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <FiLock />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className="form" onSubmit={this.handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={this.handleChange}
              autoFocus
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
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
          <div className="footer">
            <Typography variant="caption">
              <Link to="/signup"> Need an Account? Sign up here. </Link>
            </Typography>
          </div>
          <Copyright />
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(LoginPage);
