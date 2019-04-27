using System;
using System.Linq;

namespace BridgeDemo.Lib
{
    public class TicTacToeGame
    {
        private TicTacToePlayer?[,] board = new TicTacToePlayer?[3,3];

        public TicTacToePlayer?[,] Board
        {
            get
            {
                return (TicTacToePlayer?[,])board.Clone();
            }
        }


        public void PlayHumanTurn(int x, int y)
        {
            if (GameOver)
                throw new InvalidOperationException("Game over, man!");

            if (board[x, y].HasValue)
                throw new InvalidOperationException("Square already played!");

            board[x, y] = TicTacToePlayer.Human;

            if (!GameOver)
            {
                // Play AI Turn
                for (var bx = 0; bx < 3; bx++)
                {
                    for (var by = 0; by < 3; by++)
                    {
                        if (!board[bx, by].HasValue)
                        {
                            var cloneBoard = (TicTacToePlayer?[,])board.Clone();

                            // Test this move with minimax...
                            cloneBoard[bx, by] = TicTacToePlayer.AI;
                            if (Minimax(cloneBoard, TicTacToePlayer.AI) == 1)
                            {
                                // Minimax says this move is OK, make it...
                                board[bx, by] = TicTacToePlayer.AI;
                                break;
                            }
                        }
                    }
                }
            }
        }

        public TicTacToePlayer? Winner
        {
            get
            {
                return GetWinner(board);
            }
        }

        public bool GameOver
        {
            get
            {
                return board.Cast<TicTacToePlayer?[]>().All(x => x.All(y => y.HasValue)) || Winner.HasValue;
            }
        }

        /// <summary>
        /// https://towardsdatascience.com/tic-tac-toe-creating-unbeatable-ai-with-minimax-algorithm-8af9e52c1e7d
        /// </summary>
        public static int Minimax(TicTacToePlayer?[,] board, TicTacToePlayer player)
        {
            var winner = GetWinner(board);

            if (winner.HasValue)
            {
                return winner == player ? 1 : -1;
            }

            int? score = null;

            for (var x = 0; x < 3; x++)
            {
                for (var y = 0; y < 3; y++)
                {
                    if (!board[x, y].HasValue)
                    {
                        var cloneBoard = (TicTacToePlayer?[,])board.Clone();
                        // Try the move
                        cloneBoard[x, y] = player;

                        // move will be for the other player, so we want negative score
                        var scoreForTheMove = -Minimax(cloneBoard, (TicTacToePlayer)((int)player * -1));

                        if (!score.HasValue || scoreForTheMove > score)
                        {
                            score = scoreForTheMove;
                        }
                    }
                }
            }

            // return 0 if we didn't find a move
            return score.GetValueOrDefault();
        }

        public static TicTacToePlayer? GetWinner(TicTacToePlayer?[,] board)
        {
            // Check rows/columns...
            for (int i = 0; i < 3; i++)
            {
                if (board[i, 0].HasValue && board[i, 0] == board[i, 1] && board[i, 1] == board[i, 2])
                    return board[i, 0];

                if (board[0, i].HasValue && board[0, i] == board[1, i] && board[1, i] == board[2, i])
                    return board[0, i];
            }

            // Check diagonals...
            if (board[0, 0].HasValue && board[0, 0] == board[1, 1] && board[1, 1] == board[2, 2])
                return board[0, 0];

            // Check diagonals...
            if (board[0, 2].HasValue && board[0, 2] == board[1, 1] && board[1, 1] == board[2, 0])
                return board[0, 2];

            return null;
        }
    }
}
