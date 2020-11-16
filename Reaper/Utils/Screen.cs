using System;
using System.Drawing;
using System.Runtime.InteropServices;

namespace Reaper.Utils
{

  public class Screen
  {
    [DllImport("user32.dll")]
    static extern IntPtr GetDC(IntPtr hwnd);

    [DllImport("user32.dll")]
    static extern Int32 ReleaseDC(IntPtr hwnd, IntPtr hdc);

    [DllImport("gdi32.dll")]
    static extern uint GetPixel(IntPtr hdc, int nXPos, int nYPos);

    public static System.Drawing.Color GetPixelColor(int x, int y)
    {
      IntPtr hdc = GetDC(IntPtr.Zero);
      uint pixel = GetPixel(hdc, x, y);

      ReleaseDC(IntPtr.Zero, hdc);
      return Color.FromArgb((int)(pixel & 0x000000FF), (int)(pixel & 0x0000FF00) >> 8, (int)(pixel & 0x00FF0000) >> 16);
    }
    public static bool AreColorsSimilar(int x, int y, Color color, int diffLimit)
    {
      Color compareTo = GetPixelColor(x, y);
      bool alphaOk = Math.Abs(color.A - compareTo.A) <= diffLimit;
      bool redOk = Math.Abs(color.R - compareTo.R) <= diffLimit;
      bool greenOk = Math.Abs(color.G - compareTo.G) <= diffLimit;
      bool blueOk = Math.Abs(color.B - compareTo.B) <= diffLimit;
      return alphaOk && redOk && greenOk && blueOk;
    }
  }
}
