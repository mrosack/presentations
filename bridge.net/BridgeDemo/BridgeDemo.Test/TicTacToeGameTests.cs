using BridgeDemo.Lib;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace BridgeDemo.Test
{
    [TestClass]
    public class TicTacToeGameTests
    {
        [TestMethod]
        public void TestBestMove()
        {
            var board = new TicTacToePlayer?[3, 3]
            {
                { TicTacToePlayer.Human, TicTacToePlayer.Human, null },
                { TicTacToePlayer.AI, TicTacToePlayer.AI, null },
                { TicTacToePlayer.Human, TicTacToePlayer.AI, null }
            };

            Assert.AreEqual((1, 2), TicTacToeGame.FindBestMove(board, TicTacToePlayer.AI));
            Assert.AreEqual((0, 2), TicTacToeGame.FindBestMove(board, TicTacToePlayer.Human));

            board = new TicTacToePlayer?[3, 3]
            {
                { TicTacToePlayer.AI, null, null },
                { TicTacToePlayer.Human, TicTacToePlayer.Human, null },
                { null, null, null }
            };

            Assert.AreEqual((1, 2), TicTacToeGame.FindBestMove(board, TicTacToePlayer.AI));
        }

        [TestMethod]
        public void TestMinimax()
        {
            var board = new TicTacToePlayer?[3, 3]
            {
                { TicTacToePlayer.Human, TicTacToePlayer.Human, null },
                { TicTacToePlayer.AI, TicTacToePlayer.AI, null },
                { TicTacToePlayer.Human, TicTacToePlayer.AI, null }
            };

            Assert.AreEqual(-1, TicTacToeGame.Minimax(board, TicTacToePlayer.AI, TicTacToePlayer.AI));
            Assert.AreEqual(1, TicTacToeGame.Minimax(board, TicTacToePlayer.Human, TicTacToePlayer.AI));
            Assert.AreEqual(1, TicTacToeGame.Minimax(board, TicTacToePlayer.AI, TicTacToePlayer.Human));
            Assert.AreEqual(-1, TicTacToeGame.Minimax(board, TicTacToePlayer.Human, TicTacToePlayer.Human));
        }

        [TestMethod]
        public void AiWillBlockWins()
        {
            var game = new TicTacToeGame(new TicTacToePlayer?[3, 3]
            {
                { null, TicTacToePlayer.Human, null },
                { null, TicTacToePlayer.AI, null },
                { null, null, null }
            });

            game.PlayHumanTurn(0, 0);

            Assert.AreEqual(TicTacToePlayer.AI, game.Board[0, 2]);


            game = new TicTacToeGame(new TicTacToePlayer?[3, 3]
            {
                { null, TicTacToePlayer.Human, null },
                { null, TicTacToePlayer.AI, null },
                { null, null, null }
            });

            game.PlayHumanTurn(0, 2);

            Assert.AreEqual(TicTacToePlayer.AI, game.Board[0, 0]);


            game = new TicTacToeGame(new TicTacToePlayer?[3, 3]
            {
                { TicTacToePlayer.AI, null, null },
                { null, TicTacToePlayer.Human, null },
                { null, null, null }
            });

            game.PlayHumanTurn(1, 0);

            Assert.AreEqual(TicTacToePlayer.AI, game.Board[1, 2]);


            game = new TicTacToeGame(new TicTacToePlayer?[3, 3]
            {
                { TicTacToePlayer.AI, TicTacToePlayer.Human, null },
                { null, null, null },
                { null, null, null }
            });

            game.PlayHumanTurn(1, 1);

            Assert.AreEqual(TicTacToePlayer.AI, game.Board[2, 1]);
        }
    }
}
