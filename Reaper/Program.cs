using System;
using System.Threading.Tasks;

namespace Reaper
{
  class Program
  {
    static async Task Main(string[] args)
    {
      Console.WriteLine("Hello World!");
      await Utils.ResetLOL();
    }
  }
}
