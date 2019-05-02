import { Component } from '@angular/core';
import Lib = BridgeDemo.Lib;

@Component({
  selector: 'app-tic-tac-toe-component',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent {
  public game = new Lib.TicTacToeGame();
  public currentCount = 0;

  public squareClick(row: number, col: number) {
    try {
      this.game.PlayHumanTurn(row, col);
    }
    catch (ex)
    {
      alert(ex.Message);
    }

    setTimeout(() => {
      if (this.game.GameOver) {
        if (this.game.Winner)

          alert(`${this.game.Winner === Lib.TicTacToePlayer.AI ? 'AI' : 'Human'} is the winner!`);
        else
          alert("It's a draw!");
      }
    }, 10);
  }

  public squareContent(row: number, col: number) {
    // Javascript doesn't have 2d arrays, so it's converted to a 1d array (which I think is how .NET does it behind the scenes anyway)
    switch (this.game.Board[row * 3 + col]) {
      case Lib.TicTacToePlayer.AI:
        return "O";

      case Lib.TicTacToePlayer.Human:
        return "X";
    }

    return "";
  }

  public reset() {
    this.game = new Lib.TicTacToeGame();
  }
}
