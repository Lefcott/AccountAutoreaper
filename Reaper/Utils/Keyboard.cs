using WindowsInput.Native;
using WindowsInput;
using System;

namespace Reaper.Utils
{
  public class Keyboard
  {
    private static InputSimulator inputSimulator = new InputSimulator();
    public static void Write(string text)
    {
      inputSimulator.Keyboard.TextEntry(text);
    }
    public static void PressKey(VirtualKeyCode keyCode)
    {
      inputSimulator.Keyboard.KeyDown(keyCode);
      // InputSimulator.SimulateKeyPress(VirtualKeyCode.VK_H);
      // inputSimulator.SimulateKeyPress(keyCode);
    }
  }
}