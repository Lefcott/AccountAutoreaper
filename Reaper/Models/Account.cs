using System;
using System.Text.Json;
using Reaper.Utils;

namespace Reaper.Models
{
  public class Account
  {
    public readonly string UserName;
    public readonly string Password;
    public readonly string NewPassword;
    public readonly string ActualPassword;
    public Account(JsonElement account)
    {
      Json.TryAssignString(account, "UserName", out UserName);
      Json.TryAssignString(account, "Password", out Password);
      Json.TryAssignString(account, "NewPassword", out NewPassword);
      ActualPassword = String.IsNullOrEmpty(NewPassword) ? Password : NewPassword;
    }
  }
}
