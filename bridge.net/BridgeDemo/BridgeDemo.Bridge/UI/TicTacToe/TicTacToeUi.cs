using Bridge.Html5;
using Bridge.jQuery2;
using BridgeDemo.Lib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BridgeDemo.Bridge.UI.TicTacToe
{
    public static class TicTacToeUi
    {
        private static TicTacToeGame game = new TicTacToeGame();

        public static void Main()
        {
            jQuery.Ready(OnReady);
        }

        private static void OnReady()
        {
            jQuery.Select(".tttSquare").Click(OnSquareClick);
        }

        private static void UpdateBoard()
        {
            jQuery.Select(".tttSquare").Each((i, el) =>
            {
                var square = new TicTacToeSquare(el);
                
                switch (game[square.Row, square.Col])
                {
                    case TicTacToePlayer.AI:
                        el.InnerHTML = "O";
                        break;

                    case TicTacToePlayer.Human:
                        el.InnerHTML = "X";
                        break;
                }
            });
        }

        private static void OnSquareClick(jQueryMouseEvent e)
        {
            var square = new TicTacToeSquare(e.Target);

            try
            {
                game.PlayHumanTurn(square.Row, square.Col);
                UpdateBoard();
            }
            catch (InvalidOperationException ex)
            {
                UpdateBoard();
                Window.Alert(ex.Message);
            }

            if (game.IsGameOver())
            {
                var winner = game.CheckWinner();

                if (winner.HasValue)
                    Window.Alert($"{winner.ToString()} is the winner!");
                else
                    Window.Alert("It's a draw!");
            }
        }
    }
}
