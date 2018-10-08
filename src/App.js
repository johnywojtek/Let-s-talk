import React, { Component } from "react";

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

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            name: "",
            arr: []
        };
    }
    //zapisuje value z inputa jako name
    onChange = e => {
        this.setState({
            name: e.target.value
        });
    };
    //zapisuje value z inputa jako message
    onChange2 = e => {
        this.setState({
            message: e.target.value
        });
    };
    //wysyłam do firebase obiekt który ma w sobie name z inputa i message z textarea
    send = () => {
        var messageListRef = firebase.database().ref("users");
        var newMessageRef = messageListRef.push();
        newMessageRef.set({
            name: this.state.name,
            message: this.state.message
        });
    };

    componentDidMount() {
        var database = firebase.database();
        var ref = database.ref("users");
        // 2:  po push-nięciu jest to tablica obiektów z których kazdy z nich ma dwie wartosci name: i message:

        var test = true;
        // funkcja która pobiera dane z firebase
        const gotData = data => {
            if (test === true) {
                // 1: push-uje zapisane dane z firebase do pustej tablicy arr
                data.forEach(child => {
                    this.setState({
                        arr: [...this.state.arr, child.val()]
                    });
                });
                test = false;
            }
        };
        ref.on("value", gotData, errData);

        //funkcja która odpowada za errory (praktycznie nic nie robi bo errorów nie ma)
        function errData(e) {
            console.log(e);
            console.log("dfadwfaw");
        }
    }
    render() {
        console.log(this.state.arr);
        let array = this.state.arr;
        var list = array.map(e => {
            return (
                <div className="commentCont">
                    <p className="comment__name">{e.name}</p>
                    <p className="comment__message">{e.message}</p>
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
                    <button className="btn" onClick={this.send}>
                        Submit
                    </button>
                </div>
                <div className="comment">{list}</div>
            </div>
        );
    }
}

export default App;
