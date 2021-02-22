import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import { Box, Modal, Grid, Typography, Button, Menu, MenuItem, ListItemIcon, ListItemText,Slide, Dialog, 
    DialogContent, DialogContentText, DialogTitle, DialogActions  } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Redirect } from 'react-router-dom';
import apis from '../api/api'
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { BlackButton } from './styled-buttons'

export const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
  export const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

  class ListTasks extends React.Component {
    componentDidMount() {
        let string_data = window.sessionStorage.getItem("data_user");
        //console.log("componentDidMount user_data", string_data);
        if(string_data===null){
            this.setState({...this.state, goLogin: true})    
            return;
        }
        this.setState({...this.state, user_data: JSON.parse(string_data), welcomeText: `Welcome ${JSON.parse(string_data).name}`}, function(){
           this.refreshTasks(); 
        });
    }
    refreshTasks(){
        apis.get_tasks(this.state.user_data.id).then(response=>{
            if(response.data.success){
                let array_tasks=[];
                response.data.data.forEach(item=>{
                    array_tasks.push({
                        id:item._id,
                        name:item.name,
                        description:item.description,
                        done:item.done,
                        due_date:item.due_date
                    });
                });
                this.setState({...this.state, rows: array_tasks});
            }
            
        }).catch(err=>{
            console.log("error get tasks!", err.response);
        });
    }
    componentWillUnmount() {
    }
    state={
        user_data:null,
        createTask:false,
        goLogin:false,
        welcomeText:"",
        openModal:false,
        anchorEl:null,
        openConfirm:false,
        tasksSelecteds:[],
        rows:[
        ],
        columns:[
            { field: 'id', headerName: 'ID', width: 100, hide:true },
            { field: 'name', width: 200,
            renderHeader: (params) => (
                <div>
                  <Typography variant="body1" style={{fontWeight:"bold"}}>{"Task Name"}</Typography>
                </div>
              )
            },
            { field: 'description', headerName: 'Description', width: 500,
            renderHeader: (params) => (
                <div>
                  <Typography variant="body1" style={{fontWeight:"bold"}}>{"Description"}</Typography>
                </div>
              ) },
            {
                field: 'due_date_text',
                headerName: 'Due date',
                width: 150,
                valueGetter: (params) =>
                params.row.due_date.split("T")[0],
                renderHeader: (params) => (
                    <div>
                      <Typography variant="body1" style={{fontWeight:"bold"}}>{"Due Data"}</Typography>
                    </div>
                  )

            },
            // {
            //     field: 'done_text',
            //     headerName: 'Done',
            //     width: 100,
            //     valueGetter: (params) =>
            //     params.row.done===true?"Yes":"No",
            //     renderHeader: (params) => (
            //         <div>
            //           <Typography variant="body1" style={{fontWeight:"bold"}}>{"Done"}</Typography>
            //         </div>
            //       )
            // },
            {
                field: 'done',
                headerName: 'Done',
                width: 100,
                renderHeader: (params) => (
                    <div>
                      <Typography variant="body1" style={{fontWeight:"bold"}}>{"Done"}</Typography>
                    </div>
                  ),
                renderCell: (params) => (
                    params.value===true?<CheckBoxIcon fontSize="large" />:<CheckBoxOutlineBlankIcon style={{cursor:"pointer"}} onClick={this.handleConfirmTask} fontSize="large"/>
                  )
            }
            // {
            //     field: 'fullName',
            //     headerName: 'Full name',
            //     description: 'This column has a value getter and is not sortable.',
            //     sortable: false,
            //     width: 160,
            //     valueGetter: (params) =>
            //     `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
            // },
        ],
        messageError:""
    }
    cancelConfirm = () =>{
        this.setState({...this.state, openConfirm:false});
    };
    handleConfirmTask = ()=>{
        this.setState({...this.state, openConfirm:true});
    }
    handleClickMenu = (event)=>{
        this.setState({...this.state, anchorEl:event.currentTarget});
    };
    handleCloseMenu = (event)=>{
        this.setState({...this.state, anchorEl:null});
    };
    handleLogout = (event)=>{
        window.sessionStorage.removeItem("data_user");
        this.setState({...this.state, goLogin:true});
    };
    handleCreateTask = (event)=>{
        this.setState({...this.state, createTask:true});
    };
    handleDoneTask= (event)=>{
        this.cancelConfirm();
        console.log("taskSelected",this.state.tasksSelecteds[0]);
        let doneTask={
            done:true,
            _id:this.state.tasksSelecteds[0]
        };
        apis.done_task(doneTask).then(response=>{
            if(response.data.success){
                this.refreshTasks();
            }
        }).catch(err=>{
            this.setState({...this.state, messageError:err.response.data.error});
        });
    };

    render(){
        if (this.state.goLogin === true) {
            return <Redirect to='/' />
        }
        if (this.state.createTask === true) {
            return <Redirect to='/create-task' />
        }
        return(
            <Box mt={1}>
                <Grid container>
                <Grid item lg={10} md={9} sm={7} xs={"auto"}></Grid>
                <Grid item lg={2} md={3} sm={5} xs={12}>
                        <Box align="right" mr={1} mb={1}>
                            <BlackButton fullWidth size="small" variant="contained">BlackStone Challenge</BlackButton>
                        </Box>
                    </Grid>
                    <Grid item lg={10} md={10} sm={8} xs={12}>
                        <Box ml={10}>
                        <Typography variant="h2" component="h2">
                            Tasks List
                        </Typography>
                        </Box>
                        <Box display="flex" justifyContent="center">
                        <Typography color="secondary" variant="button">
                            {this.state.messageError}
                        </Typography>
                        </Box>
                    </Grid>
                    <Grid item lg={2} md={2} sm={4} xs={12}>
                        <Box align="right" mr={1} mb={1}>
                            <Button
                                fullWidth
                                aria-controls="customized-menu"
                                aria-haspopup="true"
                                variant="contained"
                                color="default"
                                onClick={this.handleClickMenu}
                                endIcon={<AccountCircleIcon />}
                            >
                                {this.state.welcomeText}
                            </Button>
                            <StyledMenu
                                id="customized-menu"
                                anchorEl={this.state.anchorEl}
                                keepMounted
                                open={Boolean(this.state.anchorEl)}
                                onClose={this.handleCloseMenu}
                            >
                                <StyledMenuItem onClick={this.handleCreateTask}>
                                <ListItemIcon>
                                    <AssignmentIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="Create new task" />
                                </StyledMenuItem>
                                {/* <StyledMenuItem onClick={this.handleCreateTask}>
                                <ListItemIcon>
                                    <CheckCircleIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="Done task" />
                                </StyledMenuItem> */}
                                <StyledMenuItem onClick={this.handleLogout}>
                                <ListItemIcon>
                                    <ExitToAppIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="Log out" />
                                </StyledMenuItem>
                            </StyledMenu>
                        </Box>
                    </Grid>
                </Grid>
                <Box height={600} width="100%">
                    <DataGrid 
                        disableMultipleSelection={true}
                        onSelectionModelChange={(newSelection) => {
                            this.setState({...this.state, tasksSelecteds:newSelection.selectionModel});
                          }}
                        selectionModel={this.state.tasksSelecteds}
                        rows={this.state.rows} 
                        columns={this.state.columns} 
                        pageSize={10} />
                </Box>
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
                            Are you sure to done this task?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.cancelConfirm} color="primary">
                            No
                        </Button>
                        <Button onClick={this.handleDoneTask} color="primary" variant="contained" >
                            Yes
                        </Button>
                        </DialogActions>
                    </Dialog>
            </Box>
        )
    }
}
export default ListTasks;


