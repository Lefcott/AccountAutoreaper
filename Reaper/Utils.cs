using System.Diagnostics;
using System;
using System.Threading.Tasks;

namespace Reaper
{
  public class Utils
  {
    static Process lolProcess = new Process();
    public static async Task ResetLOL()
    {
      CloseLOL();
      await Task.Delay(1000);
      OpenLOL();
    }
    public static void OpenLOL()
    {
      lolProcess.StartInfo.UseShellExecute = true;
      lolProcess.StartInfo.FileName = Constants.LolPath;
      lolProcess.Start();
      Console.WriteLine("Opened process, waiting...");
      lolProcess.WaitForInputIdle();
      Console.WriteLine("Opened!");
    }
    public static void CloseLOL()
    {
      foreach (string processName in Constants.LolProcessNames)
      {
        Process[] subProcesses = Process.GetProcessesByName(processName);
        foreach (Process subProcess in subProcesses)
        {
          Console.WriteLine(@"Closing {subProcess.ProcessName}");
          subProcess.CloseMainWindow();
          subProcess.Close();
        }
      }
    }
  }
}