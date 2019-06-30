const ttt = require("./tictactoe.js");

let onLoad = e => {
  main();
};

let main = () => {
  let state = {
    history: [
      {
        state: ttt.state(),
        select: null
      }
    ],
    index: 0
  };
  let _buttons = buttons();
  let _drawBoard = drawBoard(_buttons);

  let onClickHistory = index => e => {
    state.index = index;
    drawStatus(`Player${current(state).player}'s turn`);
    _drawBoard(current(state).board);
    drawHistory(state, onClickHistory);
  };

  let onClickButton = index => e => {
    if (current(state).winner || current(state).isDraw) {
      return;
    }

    if (current(state).board[index]) {
      return;
    }

    state.history = state.history.slice(0, state.index + 1);
    state.history.push({
      state: ttt.state(current(state), index),
      select: index
    });
    state.index++;

    drawStatus(`Player${current(state).player}'s turn`);
    _drawBoard(current(state).board);
    drawHistory(state, onClickHistory);

    if (current(state).winner) {
      drawStatus(`Winner: player${current(state).winner}`);
      return;
    }

    if (current(state).isDraw) {
      drawStatus(`Draw game`);
      return;
    }
  };

  _buttons.map((v, i) => v.addEventListener("click", onClickButton(i)));
  drawStatus(`Player${current(state).player}'s turn`);
  _drawBoard(current(state).board);
  drawHistory(state, onClickHistory);
};

let current = state => {
  return state.history[state.index].state;
};

let drawStatus = msg => {
  document.getElementById("status").innerText = msg;
};

let drawBoard = buttons => board => {
  buttons.map((v, i) => {
    if (board[i]) {
      v.innerText = board[i];
    } else {
      v.innerText = "";
    }
  });
};

let drawHistory = (state, onClickHistory) => {
  let curIndex = state.index;
  let ol = document.getElementById("history");
  ol.innerHTML = "";

  state.history.forEach((v, i) => {
    let li = document.createElement("li");
    let select = v.select !== null ? `Select ${v.select} => ` : "";
    li.innerText = `${select}Turn${i} Player${v.state.player}`;
    li.addEventListener("click", onClickHistory(i));
    if (i === curIndex) {
      li.classList.add("current");
    }
    ol.appendChild(li);
  });
};

let buttons = () => {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9].map(v => button(v));
};

let button = num => {
  return document.getElementById(`button${num}`);
};

window.addEventListener("load", onLoad);
