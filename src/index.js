import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as firebase from "firebase";

var config = {
    apiKey: "AIzaSyC_i6qG2KPuM943JKE-lxjH9W3JDa74Rpc",
    authDomain: "lets-talk-cd648.firebaseapp.com",
    databaseURL: "https://lets-talk-cd648.firebaseio.com",
    projectId: "lets-talk-cd648",
    storageBucket: "lets-talk-cd648.appspot.com",
    messagingSenderId: "180211078243"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById("root"));
