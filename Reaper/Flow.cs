using WindowsInput.Native;
using System.Drawing;
using System.Threading.Tasks;
using System;

namespace Reaper.Utils
{
  public class Flow
  {
    public async Task Execute()
    {

    }
    private Check[] checks =
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
      public int ClickX { get; set; }
      public int ClickY { get; set; }
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