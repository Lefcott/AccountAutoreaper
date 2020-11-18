using WindowsInput.Native;
using System;
using System.Drawing;
using System.Threading.Tasks;
using System.Text.RegularExpressions;

namespace Reaper
{
  public class Flow
  {
    public static async Task Execute()
    {
      Console.WriteLine("Execute");
      active = true;
      while (active)
      {
        foreach (Check check in checks)
        {
          bool similarColors = false;
          if (check.CheckColor != null)
          {
            similarColors = Utils.Screen.AreColorsSimilar(check.X, check.Y, (Color)check.CheckColor, colorDiff);
          }
          bool similarText = false;
          Console.WriteLine($"Similar Colors: {similarColors}");
          if (!similarColors && check.CheckTextRegex != null)
          {
            string text = Utils.Ocr.ReadFromScreenRect(check.X, check.Y, check.Width, check.Height);
            Console.WriteLine($"Detected Text: {text}");
            similarText = Regex.IsMatch(text, check.CheckTextRegex);
            Console.WriteLine($"Similar Text: {similarText}");
          }
          if (similarColors || similarText)
          {
            foreach (Action action in check.Actions)
            {
              if (action.ClickX != null && action.ClickY != null)
              {
                Utils.Mouse.SetCursorPosition((int)action.ClickX, (int)action.ClickY);
                //Utils.Mouse.LeftClick();
              }
              if (action.Write != null) Utils.Keyboard.Write(action.Write);
              if (action.PressKeys != null)
              {
                foreach (VirtualKeyCode pressKey in action.PressKeys) Utils.Keyboard.PressKey(pressKey);
              }
            }
          }
        }
        await Task.Delay(2000);
      }
    }
    public static void Stop()
    {
      active = false;
    }
    public static bool active = false;
    private static readonly int colorDiff = 8;
    private static readonly Check[] checks =
    {
      //new Check()
      //  {
      //    CheckColor = Color.FromArgb(255, 40, 42, 54),
      //    X = 961,
      //    Y = 218,
      //    Actions = new Action[]
      //    {
      //      new Action() { ClickX = 1058, ClickY = 185 }
      //    }
      //  }
      new Check()
        {
          CheckTextRegex = @"(?i)File",
          X = 40,
          Y = 0,
          Width = 30,
          Height = 30,
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
      public string? CheckTextRegex { get; set; }
      public Color? CheckColor { get; set; }
      public int X { get; set; }
      public int Y { get; set; }
      public int Width { get; set; }
      public int Height { get; set; }
      public Action[] Actions { get; set; }
    }
  }
}