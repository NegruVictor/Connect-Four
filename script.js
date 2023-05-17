const game = document.getElementById('game_board');
const reset = document.getElementById('btnReset');
let color = 1;
let score_red = 0;
let score_blue = 0;
let mat = [[0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0]];

document.addEventListener('click', (e) =>{
    let elementId = e.target.id;
    if (elementId >= 1 && elementId <= 42) {
      let n = document.getElementById(elementId);
      let column = n.getAttribute("c");
      createToken(column, color);
      color *= -1;
    }
    if (elementId == "btnReset") {
      resetGame();
      btnReset.disabled = true;
    }
  });

createGameBoard();

function createGameBoard() {
  let cont = 1;
  for (let i = 1; i <= 7; ++i) {
    for (let j = 1; j < 7; ++j) {
      let e = document.createElement("div");
      e.setAttribute('id', cont);
      e.setAttribute('c', j);
      e.setAttribute('l', i);
      ++cont;
      game.appendChild(e);
    }   
  }
}

function createToken(column, n) {
  let line = 1;
  let a = Number(document.getElementById(column).id);
  if (n == 1) {
    for (let i = a; line <= 7; ++line) {
      if (document.getElementById(i).style.backgroundColor == 'rgb(217, 65, 93)' || document.getElementById(i).style.backgroundColor == 'rgb(72, 153, 229)') {
        document.getElementById((i - 6)).style.backgroundColor = 'rgb(217, 65, 93)';
        mat[line - 1][a] = 1;
        line = 7;
      } else if (line == 7) {
        document.getElementById(i).style.backgroundColor = 'rgb(217, 65, 93)';
        mat[line][a] = 1;
      }
      i += 6;
    }  
  } else {
    for (let i = a; line <= 7; ++line) {
      if (document.getElementById(i).style.backgroundColor == 'rgb(217, 65, 93)' || document.getElementById(i).style.backgroundColor == 'rgb(72, 153, 229)') {
        document.getElementById((i - 6)).style.backgroundColor = 'rgb(72, 153, 229)';
        mat[line - 1][a] = -1;
        line = 7;
      } else if (line == 7) {
        document.getElementById(i).style.backgroundColor = 'rgb(72, 153, 229)';
        mat[line][a] = -1;
      }
      i += 6;   
    } 
  }
  if (gameOver() == -1) {
    alert("winning blue");
    btnReset.disabled = false;
  } else if (gameOver() == 1) {
    alert("winning red");
    btnReset.disabled = false;
  }
}

function gameOver() {
let blue = 0; 
let red = 0; 
  for (let i = 7; i >= 1; --i) {
    for (let j = 1; j <= 6; ++j) {
      if (mat[i][j] == 1) {
        ++red;
        blue = 0;
      } else if (mat[i][j] == -1) {
        ++blue;
        red = 0;
      } else {
        red = 0;
        blue = 0; 
      }
      if (blue == 4) {
        return -1;
      } else if (red == 4) {
        return 1;
      }
    }
  }
  for (let i = 1; i <= 6; ++i) {
    for (let j = 7; j >= 1; --j) {
      if (mat[j][i] == 1) {
        ++red;
        blue = 0;
      } else if (mat[j][i] == -1) {
        ++blue;
        red = 0;
      } else {
        red = 0;
        blue = 0;
      }
      if (blue == 4) {
        return -1;
      } else if (red == 4) {
        return 1;
      }
    }
  }
  for (let i = 7; i >= 4; --i) {
    for (let j = 4; j <= 6; ++j) {
      red = 0;
      blue = 0;
      for (let l = i, k = j; k >= 1 && l >= 1; --k, --l) {
        if (i == l && i != 7) {
          k = 6;
        }
        if (mat[l][k] == 1) {
          ++red;
          blue = 0;
        } else if (mat[l][k] == -1) {
          ++blue;
          red = 0;
        } else {
          red = 0;
          blue = 0;
        }
        if (blue == 4) {
          return -1;
        } else if (red == 4) {
          return 1;
        }
      }
      for (let l = i, k = 7 - j; k <= 6 && l >= 1; ++k, --l) {
        if (i == l && i != 7) {
          k = 1;
        }
        if (mat[l][k] == 1) {
          ++red;
          blue = 0;
        } else if (mat[l][k] == -1) {
          ++blue;
          red = 0;
        } else {
          red = 0;
          blue = 0;
        }
        if (blue == 4) {
          return -1;
        } else if (red == 4) {
          return 1;
        }
      }
    }
  }
}

function resetGame() {
  if (gameOver() == -1) {
    ++score_blue;
    document.getElementById('score_blue').textContent = score_blue;
  } else if (gameOver() == 1) {
    ++score_red;
    document.getElementById('score_red').textContent = score_red;
  }
  for (let i = 1; i <= 42; ++i) {
    document.getElementById(i).style.backgroundColor = 'rgb(241, 246, 245)';
  }
  for (let i = 0; i < 8; ++i) {
    for (let j = 0; j < 7; ++j) {
      mat[i][j] = 0;
    }
  }
}