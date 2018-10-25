import React, { Component } from "react";
import * as firebase from "firebase";

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = { arr: [] };
    }
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
                <div className="commentCont">{list}</div>
            </div>
        );
    }
}

export default Comment;
