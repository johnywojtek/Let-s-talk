import React, { Component } from "react";
import "./App.css";
import * as firebase from "firebase";

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
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
        console.log(this.state.value);
        console.log(this.state.valueName);
    };

    componentDidMount() {
        const rootRef = firebase
            .database()
            .ref()
            .child("lets-talk-cd648");

        const nameRef = rootRef.child("name");

        nameRef.on("value", snap => {
            console.log(snap);
        });
    }
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
