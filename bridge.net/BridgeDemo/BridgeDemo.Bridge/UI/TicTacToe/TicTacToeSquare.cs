using Bridge.Html5;
using Bridge.jQuery2;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BridgeDemo.Bridge.UI.TicTacToe
{
    public class TicTacToeSquare
    {
        private jQuery jSquare;

        public TicTacToeSquare(Element squareElement)
        {
            jSquare = new jQuery(squareElement);
        }

        public int Row => jSquare.Data<int>("row");

        public int Col => jSquare.Data<int>("col");
    }
}
