import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
//import App from './App';
import App from './views/login';
import NewAccount from './views/new-account';
import ListTasks from './views/list-tasks';
import CreateTask from './views/create-task';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <BrowserRouter>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/account" component={NewAccount} />
        <Route path="/tasks" component={ListTasks} />
        <Route path="/create-task" component={CreateTask} />
      </div>
    </BrowserRouter>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
