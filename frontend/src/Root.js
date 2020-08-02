import React from 'react';
import App from "./App";
import Landing from "./Landing"
import Signin from "./Signin"
import './App.css';
import {
    BrowserRouter,
    Route,
    Switch,
    Link,
    Redirect
  } from "react-router-dom";

export default function Root() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route path="/signin" component={Signin} />
                <Route path="/map" component={App} />
                <Route path="/" render = {() => <div> 404 </div>} />
            </Switch>
        </BrowserRouter>
    )
}
