import React, { Component } from "react";
import "./sim.css";

class Me extends Component {
    constructor(props) {
        super();

        this.state = {
            globalparams: props.globalparams || {
            }
        };

        this.onChange = props.onChange;

    }

    componentWillMount() { }

    render() {

        const slider = (desc, paramName, unit, min, max, step, start) => {
            const amp = 1 / step;
            const setVal = (newVal) => {
                // console.log(`setval ${paramName}=${newVal} (old val=${this.state.globalparams[paramName]})`);
                if (this.state.globalparams[paramName] === newVal) {
                    return newVal;
                }
                let newState = Object.assign(
                    {},
                    this.state.globalparams
                );
                newState[paramName] = newVal / amp;
                this.setState({ globalparams: newState }, () => {
                    // console.log(`Emit new state`,newState);
                    this.onChange && this.onChange(newState);

                });
                return newVal;
            };
            const currentVal = this.state.globalparams[paramName] || setVal(start/step);
            return (
                <article className="tile is-child box">
                    <p className="title">{desc} </p>
                    <p className="subtitle">
                        <input
                            className="slider is-fullwidth is-large is-danger is-circle"
                            step="1"
                            min={min * amp}
                            max={max * amp}
                            value={currentVal * amp}
                            type="range"
                            onChange={e => {
                                setVal(e.target.value)
                            }}
                        /><br />
                        {paramName} = {currentVal} {unit}
                    </p>
                </article>
            )
        }

        return (
            <div className="container">
                <section className="info-tiles">
                    <p>Belt transmission & rear wheel parameters</p>
                    <div className="tile is-ancestor has-text-centered">
                        <div className="tile is-parent">
                            {slider("belt thickness", "h", "mm", 0.1, 5, .1, 2.2)}
                            {slider("belt length", "L", "m", 1, 50, 0.1, 20)}

                            {slider("Diameter hub motor", "D0", "mm", 1, 100, 1, 10)}
                            {slider("Diameter hub wheel", "D2", "mm", 1, 200, 1, 60)}

                            {slider("Diameter rear wheel", "RWD", "mm", 10, 1000, 1, 180)}

                        </div>
                    </div>
                    <p>Motor</p>
                    <div className="tile is-ancestor has-text-centered">
                        <div className="tile is-parent">
                        {slider("average RPM", "rpm", "rpm", 100, 8000, 100, 3500)}
                        {slider("Track length", "Lt", "m", 10, 30, 1, 20)}
                        </div>
                    </div>
                    {/* <p>General</p>
                    <div className="tile is-ancestor has-text-centered">
                        <div className="tile is-parent">
                            {slider("Track length", "tl", "m", 10, 50, 1, 20)}
                        </div>
                    </div> */}
                </section>
                {/* </div>
            </div>
          </div>
        </section> */}
            </div >
        );
    }
}

export default Me;
