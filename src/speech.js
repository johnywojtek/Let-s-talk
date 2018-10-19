import React, { Component } from "react";

//------------------------SPEECH RECOGNITION-----------------------------

const recognition = new window.webkitSpeechRecognition();

recognition.continous = true;
recognition.interimResults = true;
recognition.lang = "en-US";

//------------------------COMPONENT-----------------------------

class Speech extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listening: false,
            msg: ""
        };
    }

    toggleListen = () => {
        this.setState(
            {
                listening: !this.state.listening
            },
            this.handleListen
        );
    };

    handleListen = () => {
        console.log("listening?", this.state.listening);

        if (this.state.listening) {
            recognition.start();
            recognition.onend = () => {
                recognition.start();
                console.log("...continue listening...");
            };
        } else {
            recognition.stop();
            recognition.onend = () => {
                console.log("Stopped listening per click");
            };
        }

        recognition.onstart = () => {
            // console.log("Listening!");
        };
        let arr = [];

        recognition.onresult = e => {
            // console.log(e);

            let transcript = [...e.results]
                .map(result => result[0])
                .map(result => result.transcript)
                .join("");
            console.log(transcript);

            if (e.results[0].isFinal) {
                arr.push(transcript);
                transcript = "";
                console.log(transcript);

                console.log(arr);

                this.props.changeMessage(arr);
            }

            var siala = `${arr} ${transcript}`;

            this.props.changeMessage(siala);

            // console.log([...arr]);
        };

        recognition.onerror = event => {
            console.log("Error occurred in recognition: " + event.error);
        };
    };

    render() {
        return (
            <div style={container}>
                <button
                    id="microphone-btn"
                    style={button}
                    onClick={this.toggleListen}
                />
            </div>
        );
    }
}

export default Speech;
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center"
    },
    button: {
        width: "60px",
        height: "60px",
        background: "lightblue",
        borderRadius: "50%",
        margin: "6em 0 2em 0"
    }
};
const { container, button } = styles;
