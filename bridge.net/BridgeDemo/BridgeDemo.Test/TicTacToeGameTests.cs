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
            var board = new TicTacToePlayer[]
            {
                TicTacToePlayer.Human, TicTacToePlayer.Human, TicTacToePlayer.None,
                TicTacToePlayer.AI, TicTacToePlayer.AI, TicTacToePlayer.None,
                TicTacToePlayer.Human, TicTacToePlayer.AI, TicTacToePlayer.None
            };

            var game = new TicTacToeGame(board);

            Assert.AreEqual(new RowCol { Row = 1, Col = 2 }, game.FindBestMove(TicTacToePlayer.AI));
            Assert.AreEqual(new RowCol { Row = 0, Col = 2 }, game.FindBestMove(TicTacToePlayer.Human));

            board = new TicTacToePlayer[]
            {
                TicTacToePlayer.AI, TicTacToePlayer.None, TicTacToePlayer.None,
                TicTacToePlayer.Human, TicTacToePlayer.Human, TicTacToePlayer.None,
                TicTacToePlayer.None, TicTacToePlayer.None, TicTacToePlayer.None
            };

            game = new TicTacToeGame(board);

            Assert.AreEqual(new RowCol { Row = 1, Col = 2 }, game.FindBestMove(TicTacToePlayer.AI));
        }

        [TestMethod]
        public void TestMinimax()
        {
            var board = new TicTacToePlayer[]
            {
                TicTacToePlayer.Human, TicTacToePlayer.Human, TicTacToePlayer.None,
                TicTacToePlayer.AI, TicTacToePlayer.AI, TicTacToePlayer.None,
                TicTacToePlayer.Human, TicTacToePlayer.AI, TicTacToePlayer.None
            };

            var game = new TicTacToeGame(board);

            Assert.AreEqual(-1, game.Minimax(TicTacToePlayer.AI, TicTacToePlayer.AI));
            Assert.AreEqual(1, game.Minimax(TicTacToePlayer.Human, TicTacToePlayer.AI));
            Assert.AreEqual(1, game.Minimax(TicTacToePlayer.AI, TicTacToePlayer.Human));
            Assert.AreEqual(-1, game.Minimax(TicTacToePlayer.Human, TicTacToePlayer.Human));
        }

        [TestMethod]
        public void AiWillBlockWins()
        {
            var game = new TicTacToeGame(new TicTacToePlayer[]
            {
                TicTacToePlayer.None, TicTacToePlayer.Human, TicTacToePlayer.None,
                TicTacToePlayer.None, TicTacToePlayer.AI, TicTacToePlayer.None,
                TicTacToePlayer.None, TicTacToePlayer.None, TicTacToePlayer.None
            });

            game.PlayHumanTurn(0, 0);

            Assert.AreEqual(TicTacToePlayer.AI, game[0, 2]);


            game = new TicTacToeGame(new TicTacToePlayer[]
            {
                TicTacToePlayer.None, TicTacToePlayer.Human, TicTacToePlayer.None,
                TicTacToePlayer.None, TicTacToePlayer.AI, TicTacToePlayer.None,
                TicTacToePlayer.None, TicTacToePlayer.None, TicTacToePlayer.None
            });

            game.PlayHumanTurn(0, 2);

            Assert.AreEqual(TicTacToePlayer.AI, game[0, 0]);


            game = new TicTacToeGame(new TicTacToePlayer[]
            {
                TicTacToePlayer.AI, TicTacToePlayer.None, TicTacToePlayer.None,
                TicTacToePlayer.None, TicTacToePlayer.Human, TicTacToePlayer.None,
                TicTacToePlayer.None, TicTacToePlayer.None, TicTacToePlayer.None
            });

            game.PlayHumanTurn(1, 0);

            Assert.AreEqual(TicTacToePlayer.AI, game[1, 2]);


            game = new TicTacToeGame(new TicTacToePlayer[]
            {
                TicTacToePlayer.AI, TicTacToePlayer.Human, TicTacToePlayer.None,
                TicTacToePlayer.None, TicTacToePlayer.None, TicTacToePlayer.None,
                TicTacToePlayer.None, TicTacToePlayer.None, TicTacToePlayer.None
            });

            game.PlayHumanTurn(1, 1);

            Assert.AreEqual(TicTacToePlayer.AI, game[2, 1]);
        }
    }
}
