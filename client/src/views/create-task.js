import React from 'react';
import {TextField, Button, Box, Typography, Slide, Dialog, 
    DialogContent, DialogContentText, DialogTitle, DialogActions} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';
import apis from '../api/api'
import moment from "moment"

export const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
class CreateTask extends React.Component {
    state={
        goLogin:false,
        goTasks:false,
        name:"",
        req_name:false,
        description:"",
        req_description:false,
        due_date:moment().format("YYYY-MM-DD"),
        req_due_date:false,
        messageError:"",
        openConfirm:false,
        data_user:null
    }
    componentDidMount() {
        let string_data = window.sessionStorage.getItem("data_user");
        if(string_data===null){
            this.setState({...this.state, goLogin: true})    
            return;
        }
        this.setState({...this.state, data_user: JSON.parse(string_data)})
    }
    cancelSave = () =>{
        this.setState({...this.state, goTasks:true});
    };
    cancelConfirm = () =>{
        this.setState({...this.state, openConfirm:false});
    };
    onConfirm = () =>{  
        this.setState({...this.state, openConfirm:true});
    };
    onSubmit = () => {
        this.setState({...this.state, 
            req_name:this.state.name.trim()==="", 
            req_description:this.state.description.trim()==="", 
            req_due_date:this.state.due_date.trim()==="",
            openConfirm:false,
            messageError:""}, function(){

        if(this.state.req_name || this.state.req_description || this.state.req_due_date ) {
                return;
            }

            let data_task = {
                name:this.state.name,
                description:this.state.description,
                due_date:this.state.due_date,
                id_user:this.state.data_user.id
            };
            apis.create_task(data_task).then(response=>{
                console.log("response create task->", response);
                if(response.data.success){
                    this.setState({...this.state, goTasks:true});    
                }
            }).catch(err=>{
                this.setState({...this.state, messageError:err.response.data.error});
            });
        });
        
    }
    handleChange = (prop) => (event) => {
        this.setState({ ...this.state, [prop]: event.target.value, ["req_"+prop]: event.target.value.trim()==="" });
    };
    render(){
        if (this.state.goLogin === true) {
            return <Redirect to='/' />
        }
        if (this.state.goTasks === true) {
            return <Redirect to='/tasks' />
        }
        return (
            <Box mt={5}>
            <Grid container spacing={2}>
                <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                <Grid item lg={4} md={8} sm={10} xs={12}>
                <Typography variant="h4" component="h2" align="center">
                    Create New Task
                </Typography>
                </Grid>
                <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                <Grid item lg={4} md={8} sm={10} xs={12}>
                    <TextField
                        fullWidth
                        error={this.state.req_name}
                        id="name"
                        name="name"
                        // onInput = {(e) =>{
                        //     e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,50)
                        // }}
                        label="Name"
                        onChange={this.handleChange("name")}
                        variant="outlined"
                        InputProps={{
                        }}
                    />
                    </Grid>
                    <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                    <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                    <Grid item lg={4} md={8} sm={10} xs={12}>
                        <TextField
                            fullWidth
                            error={this.state.req_description}
                            id="description"
                            name="description"
                            onChange={this.handleChange("description")}
                            label="Description"
                            variant="outlined"
                            multiline
                            // onInput = {(e) =>{
                            //     e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,150)
                            // }}
                            rows={4}
                            InputProps={{
                            }}
                        />
                    </Grid>
                    <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                    <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                    <Grid item lg={4} md={8} sm={10} xs={12}>
                    <TextField
                        fullWidth
                        id="due_date"
                        name="due_date"
                        label="Due date"
                        type="date"
                        error={this.state.req_due_date}
                        defaultValue={this.state.due_date}
                        onChange={this.handleChange("due_date")}
                        variant="outlined"
                        InputLabelProps={{
                        }}
                    />
                    </Grid>
                    <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                    <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                    <Grid item lg={4} md={8} sm={10} xs={12}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Button variant="contained" color="secondary" size="large" onClick={this.cancelSave}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Box display="flex" justifyContent="flex-end">
                                <Button onClick={this.onConfirm} variant="contained" color="primary" size="large">
                                    Save
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    </Grid>
                    <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                    </Grid>
                    <Dialog
                        open={this.state.openConfirm}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.cancelConfirm}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle id="alert-dialog-slide-title">{"Information"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Are you sure to do this action?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.cancelConfirm} color="primary">
                            No
                        </Button>
                        <Button onClick={this.onSubmit} color="primary" variant="contained" >
                            Yes
                        </Button>
                        </DialogActions>
                    </Dialog>
            </Box>
        )}; 
    }
    export default CreateTask;