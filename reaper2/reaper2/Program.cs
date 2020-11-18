using System.Threading.Tasks;

namespace Reaper
{
  class Program
  {
    static async Task Main(string[] args)
    {
      //Utils.Ocr.ReadFromScreenRect(40, 0, 800, 30);
      //Utils.Image.Capture(100, 100, 100, 100);
      await Flow.Execute();
    }
  }
}
