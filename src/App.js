import React, { Component } from "react";
import "./App.css";
import * as firebase from "firebase";

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let database = firebase.database();

        let ref = database.ref("name");

        ref.on("value", gotData, errData);
        function gotData(data) {
            console.log(data);

            let arr = [];

            data.forEach(function(child) {
                arr.push(child.val());
            });
        }
        function errData(e) {
            console.log("Uwaga error");
            console.log(e);
        }
        return (
            <div>
                <h1>{this.state.name}</h1>
                <p>{this.state.message}</p>
                <p>DATA</p>
            </div>
        );
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { valueName: "", value: "" };
    }
    onChange = e => {
        this.setState({
            valueName: e.target.value
        });
    };
    onChange2 = e => {
        this.setState({
            value: e.target.value
        });
    };
    send = () => {
        var data = {
            name: this.state.valueName,
            message: this.state.value
        };

        var database = firebase.database();
        var ref = database.ref("name");

        ref.push(data);
    };

    render() {
        return (
            <div>
                <h1 className="header">Hello in let's talk... so let's talk</h1>
                <div className="form">
                    <label htmlFor="name">Your Name</label>
                    <input
                        className="input"
                        value={this.state.valueName}
                        onChange={this.onChange}
                        type="text"
                        id="name"
                    />
                    <label htmlFor="message">Your Message</label>
                    <textarea
                        rows="10"
                        cols="50"
                        id="message"
                        value={this.state.value}
                        onChange={this.onChange2}
                    />
                    <button className="btn" onClick={this.send}>
                        Submit
                    </button>
                </div>

                <Item />
            </div>
        );
    }
}

export default App;
