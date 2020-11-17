using WindowsInput.Native;
using System.Drawing;
using System.Threading.Tasks;
using System;

namespace Reaper
{
  public class Flow
  {
    public static void Execute()
    {
      active = true;
      while (active)
      {
        foreach (Check check in checks)
        {
          if (Utils.Screen.AreColorsSimilar(check.X, check.Y, check.CheckColor, colorDiff))
          {
            foreach (Action action in check.Actions)
            {
              if (action.ClickX != null && action.ClickY != null)
              {
                Utils.Mouse.SetCursorPosition((int)action.ClickX, (int)action.ClickY);
                Utils.Mouse.LeftClick();
              }
              if (action.Write != null) Utils.Keyboard.Write(action.Write);
              if (action.PressKeys != null)
              {
                foreach (VirtualKeyCode pressKey in action.PressKeys) Utils.Keyboard.PressKey(pressKey);
              }
            }
          }
        }
        Task.Delay(100);
      }
    }
    public static void Stop()
    {
      active = false;
    }
    public static bool active = false;
    private static int colorDiff = 8;
    private static Check[] checks =
    {
      new Check()
        {
          CheckColor = Color.FromArgb(255, 40, 42, 54),
          X = 961,
          Y = 218,
          Actions = new Action[]
          {
            new Action() { ClickX = 1058, ClickY = 185 }
          }
        }
    };
    private class Action
    {
      public int? ClickX { get; set; }
      public int? ClickY { get; set; }
      public string Write { get; set; }
      public VirtualKeyCode[] PressKeys { get; set; }
      public bool Finish { get; set; }
    }
    private class Check
    {
      public Color CheckColor { get; set; }
      public int X { get; set; }
      public int Y { get; set; }
      public Action[] Actions { get; set; }
    }
  }
}