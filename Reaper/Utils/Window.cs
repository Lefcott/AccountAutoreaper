using System;
using System.Linq;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Security.Cryptography.X509Certificates;

namespace Reaper.Utils
{
  public class Window
  {
    [System.Runtime.InteropServices.DllImport("user32.dll")]
    [return: System.Runtime.InteropServices.MarshalAs(System.Runtime.InteropServices.UnmanagedType.Bool)]
    private static extern bool ShowWindow(IntPtr hWnd, ShowWindowEnum flags);

    [System.Runtime.InteropServices.DllImport("user32.dll")]
    private static extern int SetForegroundWindow(IntPtr hwnd);

    private enum ShowWindowEnum
    {
      Hide = 0,
      ShowNormal = 1, ShowMinimized = 2, ShowMaximized = 3,
      Maximize = 3, ShowNormalNoActivate = 4, Show = 5,
      Minimize = 6, ShowMinNoActivate = 7, ShowNoActivate = 8,
      Restore = 9, ShowDefault = 10, ForceMinimized = 11
    };

    public static void Focus(string processName)
    {
      Process process = Process.GetProcessesByName(processName).FirstOrDefault();

      if (process != null)
      {
        // check if the window is hidden / minimized
        if (process.MainWindowHandle == IntPtr.Zero)
        {
          Console.WriteLine("It was minimized");
          // the window is hidden so try to restore it before setting focus.
          ShowWindow(process.Handle, ShowWindowEnum.Restore);
        }

        // set user the focus to the window
        SetForegroundWindow(process.MainWindowHandle);
      }
      else Console.WriteLine($"Process {processName} was not open");
    }
    public static async Task WaitForTitle(string title)
    {
      Console.WriteLine($"Waiting for window with title {title}");
      bool foundTitle = false;
      while (!foundTitle)
      {
        Process[] processlist = Process.GetProcesses();
        foreach (Process process in processlist)
        {
          if (!String.IsNullOrEmpty(process.MainWindowTitle) && process.MainWindowTitle == title) foundTitle = true;
        }
        await Task.Delay(1000);
      }
      Console.WriteLine($"Found window with title {title}");
    }
  }
}