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
      if (this.game.IsGameOver()) {
        const winner = this.game.CheckWinner();

        if (winner)

          alert(`${winner === Lib.TicTacToePlayer.AI ? 'AI' : 'Human'} is the winner!`);
        else
          alert("It's a draw!");
      }
    }, 10);
  }

  public squareContent(row: number, col: number) {
    // Bridge translates the indexer to the getItem function
    switch (this.game.getItem(row, col)) {
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
