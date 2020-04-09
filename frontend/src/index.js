import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Root from './Root'
import * as serviceWorker from './serviceWorker';
import {BrowserRouter,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

ReactDOM.render(
  // <React.StrictMode>
    <Root />   
  ,
  document.getElementById('root')
);
{/* <Switch>  
        <Route exact path='/' componenet={Landing} />
        <Route exact path='/map' componenet={App} />
      </Switch> */}

    {/* <App /> */}
  {/* </React.StrictMode>, */}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
