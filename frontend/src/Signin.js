import firebase from "./firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import React , {Component} from 'react'
import App from "./App"
import withRoot from './components/landingPage/withRoot';
import AppAppBar from './components/landingPage/views/AppAppBar';
import { Button } from "@material-ui/core";
import Landing from "./Landing";

class Signin extends Component{
    state = {isSignedIn : false}
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID  
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
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }} > 
                <Button style={{background: "#28282a", color: "white"}}
                onClick= {() => firebase.auth().signInAnonymously()}>Sign In Anonymously </Button>
                </div>
                </div>
                }
            </div>
        )
    }
}
export default withRoot(Signin)