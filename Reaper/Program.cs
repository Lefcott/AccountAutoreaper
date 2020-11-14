using System;
using System.Windows.Input;
using System.Threading.Tasks;
using WindowsInput.Native;
using System.Text.Json;
using Reaper.Models;
using Reaper.Utils;

namespace Reaper
{
  class Program
  {
    static async Task Main()
    {
      // Console.WriteLine("Hello World!");
      // await Utils.Lol.Reset();
      Account account = await Services.GetAccountToReap.Execute();
      Console.WriteLine($"User Name: {account.UserName}");
      Console.WriteLine($"Actual Password: {account.ActualPassword}");
      Keyboard.Write(account.UserName);
      Keyboard.PressKey(VirtualKeyCode.TAB);
      Keyboard.Write(account.ActualPassword);
    }
  }
}
