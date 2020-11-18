using System.Threading.Tasks;
using WindowsInput.Native;
using Reaper.Models;

namespace Reaper
{
  class Program
  {
    static async Task Main(string[] args)
    {
      //Utils.Ocr.ReadFromScreenRect(40, 0, 800, 30);
      //Utils.Image.Capture(100, 100, 100, 100);
      while(true)
      {
        await Utils.Lol.Reset();
        Account account = await Services.GetAccountToReap.Execute();
        Utils.Keyboard.Write(account.UserName);
        Utils.Keyboard.PressKey(VirtualKeyCode.TAB);
        Utils.Keyboard.Write(account.ActualPassword);
        Utils.Keyboard.PressKey(VirtualKeyCode.RETURN);
        await Flow.Execute();
      }
    }
  }
}
