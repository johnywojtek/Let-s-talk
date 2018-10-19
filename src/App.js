import React, { Component } from "react";
import Speech from "./speech";
import "./App.css";
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

// speech recognition setup becouse this only work on the firefox
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            message: "",
            arr: [],
            data: "",
            test: []
        };
    }
    //zapisuje value z inputa jako name
    onChange = e => {
        this.setState({
            name: e.target.value
        });
        var utc = new Date().toLocaleString();
        console.log(typeof utc);

        this.setState({
            data: utc
        });
        console.log(this.state.data);
    };
    //zapisuje value z inputa jako message
    onChange2 = e => {
        this.setState({
            message: e.target.value
        });
    };
    //wysyłam do firebase obiekt który ma w sobie name z inputa i message z textarea
    send = () => {
        if (this.state.message.length > 0 && this.state.name.length > 0) {
            var messageListRef = firebase.database().ref("users");
            var newMessageRef = messageListRef.push();

            newMessageRef.set({
                name: this.state.name,
                message: this.state.message,
                data: this.state.data
            });

            this.setState({
                name: "",
                message: ""
            });
        } else {
            alert("Please write your name and message");
        }
    };

    onChangeMessage = msg => {
        this.setState({
            message: msg
        });
    };

    componentDidMount() {
        var database = firebase.database();
        var ref = database.ref("users");

        // funkcja która pobiera dane z firebase
        const gotData = data => {
            data.forEach(child => {
                this.setState({
                    arr: [child.val(), ...this.state.arr]
                });
            });
        };
        ref.on("value", gotData, errData);

        //funkcja która odpowada za errory
        function errData(e) {
            console.log("Uwaga Error !");
            console.log(e);
        }
    }
    render() {
        var list = this.state.arr.map(e => {
            return (
                <div className="comment">
                    <p className="comment__name">{e.name}</p>
                    <p className="comment__message">{e.message}</p>
                    <p>{e.data}</p>
                </div>
            );
        });

        return (
            <div>
                <h1 className="header">Hello in let's talk... so let's talk</h1>
                <div className="form">
                    <label htmlFor="name">Your Name</label>
                    <input
                        className="input"
                        value={this.state.name}
                        onChange={this.onChange}
                        type="text"
                        id="name"
                    />
                    <label htmlFor="message">Your Message</label>
                    <textarea
                        rows="10"
                        cols="50"
                        id="message"
                        value={this.state.message}
                        onChange={this.onChange2}
                    />
                    <Speech changeMessage={this.onChangeMessage} />

                    <button className="btn" onClick={this.send}>
                        Submit
                    </button>
                </div>
                <div className="commentCont">{list}</div>
            </div>
        );
    }
}

export default App;
