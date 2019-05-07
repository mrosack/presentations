using Bridge.Html5;
using BridgeDemo.Lib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BridgeDemo.Bridge.UI.Performance
{
    public static class PerformanceUi
    {
        public static void Main()
        {
            var tests = new PerformanceTests();

            tests.LogAction = (message) =>
            {
                Document.GetElementById("output").InnerHTML += $"{message}<br />";
                return Task.Delay(25);
            };

            tests.TimeAll();
        }
    }
}
