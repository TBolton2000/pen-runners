import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import React , {Component} from 'react'
import App from "./App"
import withRoot from './components/landingPage/withRoot';
import AppAppBar from './components/landingPage/views/AppAppBar';
import { Button } from "@material-ui/core";
import Landing from "./Landing";

firebase.initializeApp({
    apiKey: "AIzaSyA5-nNPmrd2eTVK8YDvr3YBMWkh5X5ii2w",
    authDomain: "pen-runners.firebaseapp.com",
    databaseURL: "https://pen-runners.firebaseio.com",
    projectId: "pen-runners",
    storageBucket: "pen-runners.appspot.com",
    messagingSenderId: "801197736082",
    appId: "1:801197736082:web:dd8b0725b9e80a631a664b",
    measurementId: "G-ZRWSWVMJ57"
})

class Signin extends Component{
    state = {isSignedIn : false}
    uiConfig = {
        signInFlow: "redirect",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID 
        ],
        callbacks: {
            signInSuccess : () => false
        }
    }

    componentDidMount = () => {

        

        firebase.auth().onAuthStateChanged(user => {
            this.setState({isSignedIn:!!user})
        })

    }

    render (){
        return (
            <div>
                <AppAppBar currentUser={firebase.auth().currentUser}/>
                {this.state.isSignedIn ? 
                <App currentUser={firebase.auth().currentUser} isSignedIn={this.state.isSignedIn}/>
                
                : 
                <div>
                <StyledFirebaseAuth 
                    uiConfig={this.uiConfig}
                    firebaseAuth={firebase.auth()}
                />
                </div>
                }
            </div>
        )
    }
}
export default withRoot(Signin)