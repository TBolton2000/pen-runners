import firebase from 'firebase';
const config = {
    apiKey: "AIzaSyA5-nNPmrd2eTVK8YDvr3YBMWkh5X5ii2w",
    authDomain: "pen-runners.firebaseapp.com",
    databaseURL: "https://pen-runners.firebaseio.com",
    projectId: "pen-runners",
    storageBucket: "pen-runners.appspot.com",
    messagingSenderId: "801197736082",
    appId: "1:801197736082:web:dd8b0725b9e80a631a664b",
    measurementId: "G-ZRWSWVMJ57"
};
firebase.initializeApp(config);
export default firebase;