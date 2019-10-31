import React, { Component } from "react";
import { defaults, Line } from "react-chartjs-2";
// import convictionlib from "./convictionlib.js";
import makerjs from "makerjs";
import "./sim.css";
import qs from 'query-string';

class Me extends Component {

    constructor(props) {
        super();


        this.history = props.history;

        this.state = {
            globalparams: props.globalparams,
            proposal: props.proposal,
            currenttime: 0,
            // convictiontresholdpassed: false,
            // stakeHistory: [],
            timeline: undefined,
            plot: undefined,
        };

// debugger;

    }

    componentWillMount() {
        this.recalc([]);
        this.restart();
    }

    componentWillReceiveProps(newProps) {
        //   debugger;
        // console.log("New params", newProps.globalparams);
        // this.history.push()
        this.setState({ globalparams: newProps.globalparams }, () => { this.recalc([]); });
        // this.recalc([]);
    }

    makecolor(i) {
        const r = (i * 7 * 139) % 255;
        const g = (i * 7 * 251) % 255;
        const b = (i * 7 * 43) % 255;
        return `rgba(${r},${g},${b},0.3)`;
    }

    restart() {
        this.setState({
            //globalparams: props.globalparams,
            //proposal: props.proposal,
            currenttime: 0,
            convictiontresholdpassed: false,
            // stakeHistory: [],
            // timeline: undefined,
        }, () => {

            let interval = setInterval(() => {
                // let stakeHistory = [];
                const newTime = this.state.currenttime + 1;
                console.log("tick", newTime);
                if (this.state.globalparams.tl > this.state.currenttime && !this.state.convictiontresholdpassed) {
                    this.setState({ currenttime: newTime }, () => {
                        this.recalc([]);
                        // console.log(this.state)
                    });
                    // t++;
                } else {
                    clearInterval(interval);
                    if (this.state.convictiontresholdpassed) {
                        this.recalc([{
                            t: this.state.currenttime,
                            desc: `Proposal passed !`
                        }]);
                    } else {
                        this.recalc([[{
                            t: this.state.currenttime,
                            desc: `Proposal did not pass before end of sim`
                        }]]);
                    }
                    // this.state.stakeHistory.push({
                    //     t: this.state.currenttime,
                    //     desc: `${user.name} changes stake to ${action.tokensstaked}`
                    // });
                }

            }, 1);



        });
    }

    recalc() {
        console.log("Recalc");
        if (
            !this.state.globalparams
            || !this.state.globalparams.h
            || !this.state.globalparams.L
            || !this.state.globalparams.D0
            || !this.state.globalparams.D2
            || !this.state.globalparams.RWD

        ) {
            console.log("Not enough parameters to run sim", this.state.globalparams);
            return;
        }

        const simstep = this.state.globalparams.L / 100;

        let labels = [];
        for (let t = 0; t <= this.state.globalparams.L; t += simstep) {
            labels.push(Math.floor(t));
        }

        let spool1_beltlength = [];
        let spool1_rotations = [];
        let spool1_outer_diameter = [];
        let spool2_beltlength = [];
        let spool2_rotations = [];
        let spool2_outer_diameter = [];

        let distance_traveled = [];
        let ratio = [];
        let time_elapsed = [];

        let pathArray = [];

        const initial_L_spool2 = (this.state.globalparams.L) * 1000;
        const initial_N_spool2 = (this.state.globalparams.h - this.state.globalparams.D2 + Math.sqrt((this.state.globalparams.D2 - this.state.globalparams.h) * (this.state.globalparams.D2 - this.state.globalparams.h) + (4 * this.state.globalparams.h * initial_L_spool2) / Math.PI)) / (2 * this.state.globalparams.h);
        // const initial_diameter_spool2 = 2 * initial_N_spool2 * this.state.globalparams.h;

        let winning_time = 0;
        let winning_distance = 0;

        for (let t = 0; t <= this.state.globalparams.L; t += simstep) {

            const L_spool1 = t * 1000;
            const N_spool1 = (this.state.globalparams.h - this.state.globalparams.D0 + Math.sqrt((this.state.globalparams.D0 - this.state.globalparams.h) * (this.state.globalparams.D0 - this.state.globalparams.h) + (4 * this.state.globalparams.h * L_spool1) / Math.PI)) / (2 * this.state.globalparams.h);

            const L_spool2 = (this.state.globalparams.L - t) * 1000;
            const N_spool2 = (this.state.globalparams.h - this.state.globalparams.D2 + Math.sqrt((this.state.globalparams.D2 - this.state.globalparams.h) * (this.state.globalparams.D2 - this.state.globalparams.h) + (4 * this.state.globalparams.h * L_spool2) / Math.PI)) / (2 * this.state.globalparams.h);

            const distance_traveled_now = (initial_N_spool2 - N_spool2) * this.state.globalparams.RWD * Math.PI;

            const time_elapsed_now = N_spool1 / this.state.globalparams.rpm * 60;


            // debugger;
            spool1_rotations.push(N_spool1);
            spool2_rotations.push(N_spool2);

            spool1_beltlength.push(t);
            spool2_beltlength.push(this.state.globalparams.L - t);

            const diameter_spool1 = 2 * N_spool1 * this.state.globalparams.h + this.state.globalparams.D0;
            const diameter_spool2 = 2 * N_spool2 * this.state.globalparams.h + this.state.globalparams.D2;


            if (t === 0) {

                // spool front
                pathArray.push(
                    new makerjs.paths.Circle([0,0],this.state.globalparams.D0)
                    
                );                    
                //     {
                //     type: 'circle',
                //     origin: [0, 0],
                //     radius: this.state.globalparams.D0
                // });

                pathArray.push({
                    type: 'circle',
                    origin: [0, 0],
                    radius: diameter_spool2
                });

                const offsetX = 2 * diameter_spool2 + 20;
                // spool rear
                pathArray.push({
                    type: 'circle',
                    origin: [offsetX, 0],
                    radius: diameter_spool2
                });

                pathArray.push({
                    type: 'circle',
                    origin: [offsetX, 0],
                    radius: this.state.globalparams.D2
                });




            }



            spool1_outer_diameter.push(diameter_spool1);
            spool2_outer_diameter.push(diameter_spool2);

            distance_traveled.push(distance_traveled_now / 1000);
            ratio.push(diameter_spool2 === 0 ? undefined : diameter_spool1 / diameter_spool2);
            time_elapsed.push(time_elapsed_now)

            if (!winning_time && distance_traveled_now > this.state.globalparams.Lt * 1000) {

                winning_time = time_elapsed_now;
                winning_distance = distance_traveled_now / 1000;
            }



        }

        let colorindex = 0;
        this.setState({
            winning_time: winning_time,
            winning_distance: winning_distance,
            plots: [
                {
                    labels: labels,
                    datasets: [
                        {
                            label: "gear ratio",
                            fill: false,
                            borderColor: this.makecolor(colorindex++),
                            data: ratio
                        }]
                },

                {
                    labels: labels,
                    datasets: [
                        {
                            label: "distance traveled (m)",
                            fill: false,
                            borderColor: this.makecolor(colorindex++),
                            data: distance_traveled
                        }
                    ]
                },
                {
                    labels: labels,
                    datasets: [
                        //{
                        //     label: "belt length on spool 1",
                        //     fill: false,
                        //     borderColor: this.makecolor(colorindex++),
                        //     data: spool1_beltlength
                        // }
                        // ,
                        {
                            label: "rotations on spool 1 (motor)",
                            fill: false,
                            borderColor: this.makecolor(colorindex++),
                            data: spool1_rotations
                        }
                        , {
                            label: "rotations on spool 2 (wheel)",
                            fill: false,
                            borderColor: this.makecolor(colorindex++),
                            data: spool2_rotations
                        }


                        // {
                        //     label: "time elapsed (s)",
                        //     fill: false,
                        //     borderColor: this.makecolor(colorindex++),
                        //     data: time_elapsed
                        // },

                        , {
                            label: "spool 1 outer diameter",
                            fill: false,
                            borderColor: this.makecolor(colorindex++),
                            data: spool1_outer_diameter
                        }

                        , {
                            label: "spool 2 outer diameter",
                            fill: false,
                            borderColor: this.makecolor(colorindex++),
                            data: spool2_outer_diameter
                        }
                        // , {
                        //     label: "belt length on spool 2",
                        //     fill: false,
                        //     borderColor: this.makecolor(colorindex++),
                        //     data: spool2_beltlength
                        // }
                    ]
                }],
            // timeline: timeline,
            // stakeHistory: stakeHistory,
        });


        var svg = makerjs.exporter.toSVG(pathArray);
        // debugger;
        this.setState({ svg: svg });
    }









    render() {
        // const timeline = this.state.timeline.map((item, i) => {
        //     return (
        //         <li key={i}>
        //             at time {item.t} : {item.desc}
        //         </li>
        //     );
        // });

        return (
            <div className="">

                <div className="tile is-ancestor has-text-centered">
                    <div className="tile is-parent">

                        {this.state.plots && this.state.plots.map((plot, i) => {
                            return (<div className="tile is-child box">
                                <Line key={i} data={plot} />
                            </div>)
                        })}
                    </div>
                </div>

                {this.state.winning_time ? (
                    <>
                        <p className="card-header-title">Winning time : {this.state.winning_time}s</p>
                        <p className="card-header-title">Distance traveled : {this.state.winning_distance}s</p>
                    </>
                ) : (
                        <p>You will never finish</p>

                    )}


                {this.state.svg && (
                    <>
                        <div dangerouslySetInnerHTML={{ __html: this.state.svg }} />
                    </>
                )}

                <button onClick={() => { this.restart() }}>Restart Simulation</button>
            </div>
        )
    }
}

export default Me;
