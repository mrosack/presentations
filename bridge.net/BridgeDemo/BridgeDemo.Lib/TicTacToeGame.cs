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

        public TicTacToeGame()
        {
        }

        public TicTacToeGame(TicTacToePlayer?[,] board)
        {
            if (board.GetLength(0) != 3 || board.GetLength(1) != 3)
            {
                throw new InvalidOperationException("Board must be 3x3!");
            }

            this.board = board;
        }

        public void PlayHumanTurn(int row, int col)
        {
            if (GameOver)
                throw new InvalidOperationException("Game over, man!");

            if (board[row, col].HasValue)
                throw new InvalidOperationException("Square already played!");

            board[row, col] = TicTacToePlayer.Human;

            if (!GameOver)
            {
                // Play AI Turn
                var bestMove = FindBestMove(board, TicTacToePlayer.AI);
                board[bestMove.Row, bestMove.Col] = TicTacToePlayer.AI;
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
                bool allFilled = board.Cast<TicTacToePlayer?>().All(x => x.HasValue);
                return allFilled || Winner.HasValue;
            }
        }

        public static RowCol FindBestMove(TicTacToePlayer?[,] board, TicTacToePlayer player)
        {
            var bestRow = 0;
            var bestCol = 0;
            var bestScore = -2;

            for (var bRow = 0; bRow < 3; bRow++)
            {
                for (var bCol = 0; bCol < 3; bCol++)
                {
                    if (!board[bRow, bCol].HasValue)
                    {
                        var cloneBoard = (TicTacToePlayer?[,])board.Clone();

                        // Test this move with minimax...
                        cloneBoard[bRow, bCol] = TicTacToePlayer.AI;
                        var curScore = Minimax(cloneBoard, player, player);
                        if (curScore > bestScore)
                        {
                            bestScore = curScore;
                            bestRow = bRow;
                            bestCol = bCol;
                        }
                    }
                }
            }

            return new RowCol { Row = bestRow, Col = bestCol };
        }

        /// <summary>
        /// https://towardsdatascience.com/tic-tac-toe-creating-unbeatable-ai-with-minimax-algorithm-8af9e52c1e7d
        /// https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-3-tic-tac-toe-ai-finding-optimal-move/
        /// </summary>
        public static int Minimax(TicTacToePlayer?[,] board, TicTacToePlayer maximizingPlayer, TicTacToePlayer player)
        {
            var winner = GetWinner(board);

            if (winner.HasValue)
            {
                return winner == maximizingPlayer ? 1 : -1;
            }

            int? score = null;

            for (var row = 0; row < 3; row++)
            {
                for (var col = 0; col < 3; col++)
                {
                    if (!board[row, col].HasValue)
                    {
                        var cloneBoard = (TicTacToePlayer?[,])board.Clone();
                        var nextPlayer = (TicTacToePlayer)((int)player * -1);
                        cloneBoard[row, col] = nextPlayer;

                        var scoreForTheMove = Minimax(cloneBoard, maximizingPlayer, nextPlayer);

                        if (maximizingPlayer == nextPlayer)
                        {
                            if (!score.HasValue || scoreForTheMove > score)
                            {
                                score = scoreForTheMove;
                            }
                        }
                        else
                        {
                            if (!score.HasValue || scoreForTheMove < score)
                            {
                                score = scoreForTheMove;
                            }
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

        public class RowCol
        {
            public int Row { get; set; }

            public int Col { get; set; }
        }
    }
}
