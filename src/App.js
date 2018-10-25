import React from "react";
import Comment from "./Comment";
import Form from "./Form";
import "./App.css";
import * as firebase from "firebase";
import { library } from "@fortawesome/fontawesome-svg-core";

import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

library.add(faMicrophone);

var config = {
    apiKey: "AIzaSyC_i6qG2KPuM943JKE-lxjH9W3JDa74Rpc",
    authDomain: "lets-talk-cd648.firebaseapp.com",
    databaseURL: "https://lets-talk-cd648.firebaseio.com",
    projectId: "lets-talk-cd648",
    storageBucket: "lets-talk-cd648.appspot.com",
    messagingSenderId: "180211078243"
};
firebase.initializeApp(config);

// speech recognition setup becouse this only work on the firefox
const App = props => {
    return (
        <div>
            <h1 className="header">Hello in let's talk... so let's talk</h1>
            <Form />
            <Comment />
        </div>
    );
};

export default App;
