import React from 'react';
import clsx from 'clsx';
//import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import {TextField, OutlinedInput, IconButton, Button, Box, Typography} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {AccountCircle, Visibility, VisibilityOff } from '@material-ui/icons';
import { Redirect } from 'react-router-dom';
import apis from '../api/api'
import validateEmail from "../utility/auxiliars";

class NewAccount extends React.Component {
    state={
        backLogin:false,
        name:"",
        req_name:false,
        last_name:"",
        req_last_name:false,
        mothers_last_name:"",
        req_mothers_last_name:false,
        email:"",
        req_email:false,
        password:"",
        req_password:false,
        password_confirm:"",
        req_password_confirm:false,
        messageError:""
    }
    onSubmit = () => {
        console.log("this.state.name", this.state.name);
        this.setState({...this.state, 
            req_name:this.state.name.trim()==="", 
            req_last_name:this.state.last_name.trim()==="", 
            req_mothers_last_name:this.state.mothers_last_name.trim()==="",
            req_email:this.state.email.trim()==="", 
            req_password:this.state.password.trim()==="", 
            req_password_confirm:this.state.password_confirm.trim()==="",
            messageError:""}, function(){

        if(this.state.req_email || this.state.req_last_name || this.state.req_name || 
            this.state.req_password || this.state.req_password_confirm) {
                return;
            }
            if(this.state.password.trim()!==this.state.password_confirm.trim()){
                this.setState({...this.state, messageError:"The passwords do not match."});
                return;
            }
            if(!validateEmail(this.state.email.trim())){
                this.setState({...this.state, messageError:"Please enter a valid email."});
                return;
            }
//            console.log("data send", this.state);

            let data_user = {
                email:this.state.email,
                password:this.state.password,
                first_name:this.state.name,
                last_name_a:this.state.last_name,
                last_name_b:this.state.mothers_last_name
            };
            apis.new_user(data_user).then(response=>{
                console.log("response create user->", response);
            }).catch(err=>{
                this.setState({...this.state, messageError:err.response.data.error});
            });
        });
        
    }
    onCancel = () => {
        this.setState({...this.state, backLogin:true});
    }
    handleChange = (prop) => (event) => {
        this.setState({ ...this.state, [prop]: event.target.value, ["req_"+prop]: event.target.value.trim()==="" });
    };
    render(){
        if (this.state.backLogin === true) {
            return <Redirect to='/' />
        }
        return (
            <Box mt={5}>
            <Grid container spacing={2}>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                <Typography variant="h4" component="h2" align="center">
                    Create Your User Account
                </Typography>
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        error={this.state.req_name}
                        id="name"
                        name="name"
                        label="Name"
                        onChange={this.handleChange("name")}
                        variant="outlined"
                        InputProps={{
                        }}
                    />
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            error={this.state.req_last_name}
                            id="last_name"
                            name="last_name"
                            onChange={this.handleChange("last_name")}
                            label="Last Name"
                            variant="outlined"
                            InputProps={{
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            id="mothers_last_name"
                            name="mothers_last_name"
                            onChange={this.handleChange("mothers_last_name")}
                            label="Mother's Last Name"
                            variant="outlined"
                            InputProps={{
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            error={this.state.req_email}
                            id="email"
                            name="email"
                            onChange={this.handleChange("email")}
                            label="Email"
                            variant="outlined"
                            InputProps={{
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            id="password"
                            error={this.state.req_password}
                            name="password"
                            onChange={this.handleChange("password")}
                            label="Password"
                            type="password"
                            variant="outlined"
                            InputProps={{
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            type="password"
                            error={this.state.req_password_confirm}
                            id="password_confirm"
                            name="password_confirm"
                            onChange={this.handleChange("password_confirm")}
                            label="Confirm Password"
                            variant="outlined"
                            InputProps={{
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <Box display="flex" justifyContent="center">
                        <Typography color="secondary" variant="button">
                            {this.state.messageError}
                        </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Button variant="contained" color="secondary" size="large" onClick={this.onCancel}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Box display="flex" justifyContent="flex-end">
                                <Button onClick={this.handleSubmit} variant="contained" color="primary" size="large" onClick={this.onSubmit}>
                                    Save
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    </Grid>
                    <Grid item xs={4}></Grid>
                    </Grid>
            </Box>
        )};
    }
    export default NewAccount;