import React, { Component } from "react";

class Me extends Component {
  constructor(props) {
    super();

    this.state = {
      time: 50
    };
  }
  changeTime(e) {
    console.log("time changed " +  e.target.value);
    this.setState({ time: e.target.value });
  }

  render() {
    return (
      <section class="hero is-info welcome is-small">
        <div class="hero-body">
          <div class="container">
            <input
              class="slider is-fullwidth is-large is-danger is-circle"
              step="1"
              min="0"
              max="100"
              value={this.state.time}
              type="range"
              onChange={e => {
                this.changeTime(e);
              }}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default Me;
