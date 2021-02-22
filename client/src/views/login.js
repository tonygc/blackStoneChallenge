import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import {TextField, OutlinedInput, IconButton, Button, Box, Typography} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {AccountCircle, Visibility, VisibilityOff } from '@material-ui/icons';
import apis from '../api/api'
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';


// const useStyles = makeStyles((theme) => ({
//   margin: {
//     margin: theme.spacing(1),
//   },
//   buttonCustom: {
//     minWidth: 180
//   }
// }));

class Login extends React.Component {
  state={
    email: '',
    password: '',
    showPassword: false,
    createAccount:false,
    taskList:false,
    validateEmail:false,
    validatePassword:false,
    messageError:""
  }

  componentDidMount() {
    console.log("EMAIL",window.sessionStorage.getItem("email_account"));
    if(window.sessionStorage.getItem("email_account")){
      this.setState({...this.state, email: window.sessionStorage.getItem("email_account")},(ev)=>{
        window.sessionStorage.removeItem("email_account")
      });
      
    }
  }

  handleChange = (prop) => (event) => {
    this.setState({ ...this.state, [prop]: event.target.value });
  };
  
  handleClickShowPassword = () => {
    this.setState({ ...this.state, showPassword: !this.state.showPassword });
  };
  
  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  handleChangeEmail = (event)=>{
    this.setState({ ...this.state, email: event.target.value, validateEmail: event.target.value.trim()==="" });
  };

  handleChangePassword = (event)=>{
    this.setState({ ...this.state, password: event.target.value, validatePassword: event.target.value.trim()==="" });
  };
  
  hancleClickLogin = async () => {
    // await apis.ping().then(movies => {
    //     console.log("response ping", movies);
    // })
    // console.log(this.state.email);
    // console.log(this.state.password)
    this.setState({ ...this.state, validateEmail: this.state.email.trim()==="", validatePassword: this.state.password.trim()==="", messageError: '' });
    if(this.state.email!=="" && this.state.password!==""){
      apis.login(this.state.email, this.state.password).then(response=>{
        //sconsole.log("response login!", response);
        window.sessionStorage.removeItem("data_user");
        if(response.data.success)
        {
          window.sessionStorage.setItem("data_user", 
          JSON.stringify
          ({
            name : response.data.data.first_name,
            last_name : response.data.data.last_name_a,
            mothers_last_name : response.data.data.last_name_b,
            id: response.data.data._id,
            email: this.state.email
          }));
          this.setState({...this.state, taskList: true});
         }
      }).catch(err=>{
        //console.log("error message!", err.response.data);
        if(err.response!=undefined)
          this.setState({...this.state, messageError: err.response.data.error});
        else
          this.setState({...this.state, messageError: "No data connection"});
      });
    }
  };

  hancleClickAccount = async () => {
    // await apis.ping().then(movies => {
    //     console.log("response ping", movies);
    // })
    this.setState({...this.state, createAccount:true});
  };

  render(){
    const buttonCustom = {
      minWidth: 180
    }
    const margin = {
      margin: 1
    }

    if (this.state.createAccount === true) {
        return <Redirect to='/account' />
    }
    if (this.state.taskList === true) {
      return <Redirect to='/tasks' />
    }
    return (
    <div>
      <Grid container spacing={2}>
      <Grid item lg={4} md={3} sm={1} xs={"auto"}></Grid>
        <Grid item lg={4} md={6} sm={10} xs={12}>
          <Typography variant="h2" component="h2" align="center">
            Challenge BlackStone
          </Typography>
        </Grid>
        <Grid item lg={4} md={3} sm={1} xs={"auto"}></Grid>
        <Grid item lg={4} md={3} sm={1} xs={"auto"}></Grid>
        <Grid item lg={4} md={6} sm={10} xs={12}>
            <TextField
                fullWidth
                style={margin}
                id="email"
                name="email"
                value={this.state.email}
                label="User"
                onChange={this.handleChangeEmail}
                error={this.state.validateEmail}
                variant="outlined"
                InputProps={{
                endAdornment: (
                    <InputAdornment position="start">
                    <AccountCircle />
                    </InputAdornment>
                ),
                }}
            />
            </Grid>
            <Grid item lg={4} md={3} sm={1} xs={"auto"}></Grid>
            <Grid item lg={4} md={3} sm={1} xs={"auto"}></Grid>
            <Grid item lg={4} md={6} sm={10} xs={12}>
                <FormControl 
                style={margin}//, classes.textField)} 
                variant="outlined"
                fullWidth>
                <InputLabel error={this.state.validatePassword} htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        name="password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.password}
                        onChange={this.handleChangePassword}
                        error={this.state.validatePassword}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            onMouseDown={this.handleMouseDownPassword}
                            edge="end"
                            >
                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }
                        labelWidth={70}
                    />
                </FormControl>
            </Grid>
            <Grid item lg={4} md={3} sm={1} xs={"auto"}></Grid>
            <Grid item lg={4} md={3} sm={1} xs={"auto"}></Grid>
            <Grid item lg={4} md={6} sm={10} xs={12}>
            <Box display="flex" justifyContent="center">
              <Typography color="secondary" variant="h6">
                {this.state.messageError}
              </Typography>
              </Box>
            </Grid>
            <Grid item lg={4} md={3} sm={1} xs={"auto"}></Grid>
            <Grid item lg={4} md={3} sm={1} xs={"auto"}></Grid>
            <Grid item lg={4} md={6} sm={10} xs={12}>
              <Box display="flex" justifyContent="flex-end">
                <Button variant="contained" 
                style={buttonCustom} 
                color="primary" size="large" onClick={this.hancleClickLogin}>
                    Login
                </Button>
              </Box>
            </Grid>
            <Grid item lg={4} md={3} sm={1} xs={"auto"}></Grid>
            <Grid item lg={4} md={3} sm={1} xs={"auto"}></Grid>
            <Grid item lg={4} md={6} sm={10} xs={12}>
              <Box display="flex" justifyContent="flex-end">
                <Button variant="contained" 
                style={buttonCustom}
                color="default" size="large" onClick={this.hancleClickAccount}>
                    Create Account
                </Button>
              </Box>
            </Grid>
            <Grid item lg={4} md={3} sm={1} xs={"auto"}></Grid>
        </Grid>
    </div>
  )
  };
}
export default Login;