using System.Text.Json;

namespace Reaper.Utils
{
  public class Json
  {
    public static void TryAssignString(JsonElement json, string key, out string output)
    {
      output = null;
      JsonElement tempProperty;
      if (json.TryGetProperty(key, out tempProperty)) output = tempProperty.ToString();
    }
  }
}
