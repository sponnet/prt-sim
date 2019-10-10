import React, { Component } from "react";
import logo from "./logo.svg";
// import './App.css';
import "bulma/css/bulma.css";
// import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import GlobalParams from "./components/GlobalParams.js";
import ConvictionVoting from "./components/ConvictionVoting.js";
import TimeLine from "./components/TimeLine.js";
class App extends Component {
    constructor(props) {
        super();

        this.state = {
            globalparams: {
                // alpha: 90,
                // totaltime: 100,
                // convictionthreshold: 50000,
            },
        };
    }

    timeChanged(e) {
        console.log("app: time changed");
    }

    render() {

        return (
            <div className="App">
             <section className="hero is-info welcome">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="header-1">Powertool beltgear simulator</h1>
                        </div>
                    </div>
                   
                </section>
                {/* <section className="info-tiles"> */}
                    <GlobalParams
                        globalparams={this.state.globalparams}
                        onChange={data => {
                            // console.log("New data", data);
                            this.setState({ globalparams: data });
                        }}
                    />
                {/* </section> */}
                <ConvictionVoting
                    globalparams={this.state.globalparams}

                />
                {/* <section className="info-tiles">{votes}</section> */}
            </div>
        )
    }
}

export default App;
