using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BridgeDemo.Lib
{
    public class PerformanceTests
    {
        public Func<string, Task> LogAction { get; set; } = (message) =>
        {
            Console.WriteLine(message);
            return Task.FromResult(true);
        };

        public async Task TimeAll()
        {
            await TimeAction(nameof(TestIntSums), TestIntSums);
            await TimeAction(nameof(TestDoubleSums), TestDoubleSums);
            await TimeAction(nameof(TestDecimalSums), TestDecimalSums);
            await TimeAction(nameof(TestStringBuilder), TestStringBuilder);
            await TimeAction(nameof(TestStringConcat), TestStringConcat);
            await TimeAction(nameof(TestStringFormat), TestStringFormat);
            await TimeAction(nameof(TestTicTacToe), TestTicTacToe);
            await TimeAction(nameof(TestTicTacToeSlow), TestTicTacToeSlow);
            await TimeAction(nameof(TestRegexIsMatch), TestRegexIsMatch);
            await TimeAction(nameof(TestListAndLinq), TestListAndLinq); 
        }

        public void TestIntSums()
        {
            int total = 0;

            for (int i = 0; i < 1000 * 1000; i++)
            {
                total += i;
            }
        }

        public void TestDoubleSums()
        {
            double total = 0;

            for (double i = 0; i < 1000 * 1000; i++)
            {
                total += i;
            }
        }

        public void TestDecimalSums()
        {
            decimal total = 0;

            for (decimal i = 0; i < 1000 * 1000; i++)
            {
                total += i;
            }
        }

        public void TestStringBuilder()
        {
            var sb = new StringBuilder();

            for (int i = 0; i < 1000 * 25; i++)
            {
                sb.Append(i);
            }
        }

        public void TestStringConcat()
        {
            var result = string.Empty;

            for (int i = 0; i < 1000 * 25; i++)
            {
                result = result + i;
            }
        }

        public void TestStringFormat()
        {
            var result = string.Empty;

            for (int i = 0; i < 1000 * 25; i++)
            {
                result = $"{result}{i}";
            }
        }

        public void TestRegexIsMatch()
        {
            var regex = new System.Text.RegularExpressions.Regex("^wat$");

            for (int i = 0; i < 1000 * 25; i++)
            {
                regex.IsMatch("wat" + i);
            }
        }

        public void TestListAndLinq()
        {
            var list = new List<int>();

            for (int i = 0; i < 1000; i++)
            {
                list.Add(i);
                list.SingleOrDefault(x => x == i);
            }
        }

        public void TestTicTacToe()
        {
            var game = new TicTacToeGame();
            game.PlayHumanTurn(1, 1);
            game.PlayHumanTurn(0, 1);
            game.PlayHumanTurn(2, 0);
            game.PlayHumanTurn(2, 2);
            game.PlayHumanTurn(1, 2);
        }

        public void TestTicTacToeSlow()
        {
            var game = new TicTacToeGameSlow();
            game.PlayHumanTurn(1, 1);
            game.PlayHumanTurn(0, 1);
            game.PlayHumanTurn(2, 0);
            game.PlayHumanTurn(2, 2);
            game.PlayHumanTurn(1, 2);
        }

        public async Task TimeAction(string name, Action action)
        {
            Stopwatch s = new Stopwatch();
            s.Start();
            action();
            s.Stop();

            await LogAction($"{name}: {s.ElapsedMilliseconds} ms");
        }
    }
}
