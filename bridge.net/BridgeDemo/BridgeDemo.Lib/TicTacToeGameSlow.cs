using System;
using System.Linq;

namespace BridgeDemo.Lib
{
    public class TicTacToeGameSlow
    {
        private TicTacToePlayer?[] board = new TicTacToePlayer?[9];

        public TicTacToePlayer? this[int row, int col]
        {
            get
            {
                if (row < 0 || row > 2)
                    throw new InvalidOperationException("Row must be 0, 1 or 2");

                if (col < 0 || col > 2)
                    throw new InvalidOperationException("Col must be 0, 1 or 2");

                return board[row * 3 + col];
            }

            private set
            {
                if (row < 0 || row > 2)
                    throw new InvalidOperationException("Row must be 0, 1 or 2");

                if (col < 0 || col > 2)
                    throw new InvalidOperationException("Col must be 0, 1 or 2");

                board[row * 3 + col] = value;
            }
        }

        public TicTacToeGameSlow()
        {
        }

        public TicTacToeGameSlow(TicTacToePlayer?[] board)
        {
            if (board.Length != 9)
            {
                throw new InvalidOperationException("Board must have 9 spaces!");
            }

            this.board = board;
        }

        public void PlayHumanTurn(int row, int col)
        {
            var gameOver = IsGameOver();

            if (gameOver)
                throw new InvalidOperationException("Game over, man!");

            if (this[row, col].HasValue)
                throw new InvalidOperationException("Square already played!");

            this[row, col] = TicTacToePlayer.Human;

            if (!gameOver)
            {
                // Play AI Turn
                var bestMove = FindBestMove(TicTacToePlayer.AI);
                this[bestMove.Row, bestMove.Col] = TicTacToePlayer.AI;
            }
        }

        public TicTacToePlayer? CheckWinner()
        {
            // Check rows/columns...
            for (int i = 0; i < 3; i++)
            {
                if (this[i, 0].HasValue && this[i, 0] == this[i, 1] && this[i, 1] == this[i, 2])
                    return this[i, 0];

                if (this[0, i].HasValue && this[0, i] == this[1, i] && this[1, i] == this[2, i])
                    return this[0, i];
            }

            // Check diagonals...
            if (this[0, 0].HasValue && this[0, 0] == this[1, 1] && this[1, 1] == this[2, 2])
                return this[0, 0];

            // Check diagonals...
            if (this[0, 2].HasValue && this[0, 2] == this[1, 1] && this[1, 1] == this[2, 0])
                return this[0, 2];

            return null;
        }

        public bool IsGameOver()
        {
            bool allFilled = board.All(x => x.HasValue);
            return allFilled || CheckWinner().HasValue;
        }

        public RowCol FindBestMove(TicTacToePlayer player)
        {
            var bestRow = 0;
            var bestCol = 0;
            var bestScore = -2;

            for (var bRow = 0; bRow < 3; bRow++)
            {
                for (var bCol = 0; bCol < 3; bCol++)
                {
                    if (!this[bRow, bCol].HasValue)
                    {
                        var cloneGame = new TicTacToeGameSlow((TicTacToePlayer?[])board.Clone());

                        // Test this move with minimax...
                        cloneGame[bRow, bCol] = TicTacToePlayer.AI;
                        var curScore = cloneGame.Minimax(player, player);
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
        public int Minimax(TicTacToePlayer maximizingPlayer, TicTacToePlayer player)
        {
            var winner = CheckWinner();

            if (winner.HasValue)
            {
                return winner == maximizingPlayer ? 1 : -1;
            }

            int? score = null;

            for (var row = 0; row < 3; row++)
            {
                for (var col = 0; col < 3; col++)
                {
                    if (!this[row, col].HasValue)
                    {
                        var cloneGame = new TicTacToeGameSlow((TicTacToePlayer?[])board.Clone());
                        var nextPlayer = (TicTacToePlayer)((int)player * -1);
                        cloneGame[row, col] = nextPlayer;

                        var scoreForTheMove = cloneGame.Minimax(maximizingPlayer, nextPlayer);

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
    }
}
