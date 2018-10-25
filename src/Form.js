import React, { Component } from "react";
import Speech from "./speech";

import * as firebase from "firebase";

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            message: "",
            data: ""
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

    render() {
        return (
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
                <div className="textarea__cont">
                    <textarea
                        id="message"
                        value={this.state.message}
                        onChange={this.onChange2}
                    />
                    <Speech changeMessage={this.onChangeMessage} />
                </div>

                <button className="btn" onClick={this.send}>
                    Submit
                </button>
            </div>
        );
    }
}

export default Form;
