# Commons Stack Sim

React app for simulating and visualizing the concepts of the Commons Stack

## Installing

```
$ yarn
$ yarn start
```

## Components

### Token Bonding Curve (Team 1)

TODO

Ideally this component offers following interface to the conviction module

- An array of users / pseudonymous accounts
- Query functions
    -  total pool (xDAI) size on a given time t.
    -  balance of a user on a given time t

(use MiniMe for the pool & staking tokens ?)

### Conviction voting (Team 2)

The conviction math is in `components/convictionlib.js`

The visualisation / simulation is in `components/ConvictionVoting.js`


### Creating and nominating funding proposals (Team 3)

TODO 

#### Simulation scenario's

There should be a number of scenario's which we ideally can replay over the different components and fiddle with the parameters to watch the behaviour of the system - and tweak these parameters until we have a system that makes sense withing certain boundaries.

The scenario's currently take this form

```javascript
 {
          timecreated: 0,
          id: 1,
          value: 1000,
          name: "Spend 1000 xDAI on X",
          convictions: [
            {
              name: "Griff",
              stakes: [
                { time: 0, tokensstaked: 1000 },
                { time: 50, tokensstaked: 0 }
              ]
            },
            {
              name: "Jeff",
              stakes: [
                { time: 30, tokensstaked: 1000 },
                { time: 80, tokensstaked: 7000 }
              ]
            }

          ]
        }
```

### Further work

#### Determine boundaries

The system should work within certain boundaries. These simulations should show the boundaries that result into acceptable behaviour of the system. One of the goals of this visualisation & simulation is to determine and document these boundaries.

## CSS framework

The CSS framework in use is Bulma ( https://bulma.io/documentation/ )

It is easy themable and you make any react component look nice without too much overhead.

There are some good examples of using Bulma here : https://dansup.github.io/bulma-templates/

# prt-sim
