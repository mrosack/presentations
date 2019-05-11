using System;
using System.Collections.Generic;
using System.Text;

namespace BridgeDemo.Lib
{
    public class RowCol
    {
        public int Row { get; set; }

        public int Col { get; set; }

        public override bool Equals(object obj)
        {
            var other = obj as RowCol;

            return other != null && Row == other.Row && Col == other.Col;
        }
    }
}
