using System.Diagnostics;
using System;
using System.Threading.Tasks;

namespace Reaper.Utils
{
  public class Lol
  {
    static Process lolProcess = new Process();
    public static async Task Reset()
    {
      Close();
      await Task.Delay(1000);
      Open(true);
      await Window.WaitForTitle(Constants.LolWindowTitle);
      Window.Focus(Constants.LolWindowProcess);
    }
    public static void Open(bool waitForStart)
    {
      lolProcess.StartInfo.UseShellExecute = true;
      lolProcess.StartInfo.FileName = Constants.LolPath;
      lolProcess.Start();
      Console.WriteLine("Opened LOL process, waiting...");
      if (waitForStart) lolProcess.WaitForInputIdle();
      Console.WriteLine("Opened LOL!");
    }
    public static void Close()
    {
      foreach (string processName in Constants.LolProcessNames)
      {
        Process[] subProcesses = Process.GetProcessesByName(processName);
        foreach (Process subProcess in subProcesses)
        {
          Console.WriteLine($"Closing {subProcess.ProcessName}");
          subProcess.CloseMainWindow();
          subProcess.Close();
        }
      }
    }
  }
}