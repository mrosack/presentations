using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BridgeDemo.Test
{
    [TestClass]
    public class PerformanceTests
    {
        [TestMethod]
        public async Task RunPerformanceTests()
        {
            var tests = new Lib.PerformanceTests();
            await tests.TimeAll();
        }
    }
}
