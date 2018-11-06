import React, { Component } from 'react';
import { render } from 'react-dom';


// Entry point for styles
import './scss/index.scss';

// Get the root node
const rootNode = document.querySelector('#root');

// Entry point for the application
class App extends Component {
  componentDidMount() {
    fetch('https://fl-homework-api.firebaseio.com/mozart.json')
      .then(response => response.json())
      .then((data) => {
        let result = '<h2>Playlist</h2>';
        data.forEach((track) => {
          result += `
            <div class="player">
              <div>${track.title}</div>
              <div>${track.author}</div>
              <audio src='${track.mp3}' controls='controls' class="material-icons"></audio>
            </div>
          `;
        });
        rootNode.innerHTML = result;
      });
  }

  render() {
    return ('Loading...');
  }
}

render(
  <App />,
  rootNode,
);
