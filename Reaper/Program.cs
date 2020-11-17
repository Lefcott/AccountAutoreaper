using System;
using System.Drawing;
using System.Windows.Input;
using WindowsInput.Native;
using System.Text.Json;
using Reaper.Models;
using Reaper.Utils;

namespace Reaper
{
  class Program
  {
    static void Main()
    {
      // Utils.Mouse.SetCursorPosition(800, 200);
      // Utils.Mouse.MouseEvent(Utils.Mouse.MouseEventFlags.LeftDown);

      Flow.Execute();

      // Utils.Mouse.MouseEvent(Utils.Mouse.MouseEventFlags.LeftUp);
      // var color = Utils.Screen.GetPixelColor(25, 25);
      // Console.WriteLine(color);
      // bool areSimilar = Screen.AreColorsSimilar(1251, 132, Color.FromArgb(255, 39, 43, 55), 0);
      // Console.WriteLine(areSimilar);
      // await Utils.Lol.Reset();
      // Account account = await Services.GetAccountToReap.Execute();
      // Console.WriteLine($"User Name: {account.UserName}");
      // Console.WriteLine($"Actual Password: {account.ActualPassword}");
      // Keyboard.Write(account.UserName);
      // Keyboard.PressKey(VirtualKeyCode.TAB);
      // Keyboard.Write(account.ActualPassword);
      // Keyboard.PressKey(VirtualKeyCode.RETURN);
    }
  }
}
