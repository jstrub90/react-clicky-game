import React, { Component, Fragment } from 'react';
import './css/App.css';
import HeaderSection from './components/HeaderSection';
import Ocean from './components/Ocean';
import data from "./data";

class App extends Component {
  state = {
    data,
    score: 0,
    topScore: 0,
    status: 'Click any fish to begin',
    message: "Get as many as you can in a row without clicking the same fish twice!"
  }

  messages = [
    "Awesome!",
    "Great, you're so close to catching them all!",
    "Lets set a new high score!",
    "Keep on clicking on!",
    "Clicks away!"
  ]

  componentDidMount = () => {
    this.setState({ data: this.shuffleData(this.state.data) });
  }

  shuffleData = data => {
    let newData = data.sort(function(a, b){return 0.5 - Math.random()});
    return newData;
  };

  handleClick = event => {
    const id = event.target.dataset.id;
    this.checkGuess(id);
  }

  resetData = data => {
    const resetData = data.map(item => ({ ...item, clicked: false }));
    return this.shuffleData(resetData);
  };

  checkGuess = id => {
    let correctGuess = false;
    const newData = this.state.data.map(item => {
      if (item.id === parseInt(id)) {
        if (!item.clicked) {
          item.clicked = true;
          correctGuess = true;
        }
      }
      return item;
    });
    if (correctGuess) {
      let newScore = this.state.score + 1;
      this.setState(
        {
          data: this.shuffleData(newData),
          score: newScore,
          topScore: Math.max(newScore, this.state.topScore),
          message: this.messages[Math.floor(Math.random()*this.messages.length)]
        }
      )
    }
    else {
      this.setState(
        {
          data: this.resetData(newData),
          score: 0,
          message: 'Oh no, you caught the same fish twice! Try again!.'
        }
      )
    }
  }

  render() {
    return (
      <Fragment>
        <HeaderSection
          status={this.state.status}
          score={this.state.score}
          topScore={this.state.topScore}
        />
        <Ocean
          message={this.state.message}
          fish={this.state.data}
          handleClick={this.handleClick}
        />
      </Fragment>
    );
  }
}

export default App;