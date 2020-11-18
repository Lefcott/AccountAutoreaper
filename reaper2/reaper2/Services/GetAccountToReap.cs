using System;
using System.Net.Http;
using System.Threading.Tasks;
using Reaper.Utils;
using System.Net.Http.Json;
using System.Text.Json;
using Reaper.Models;

namespace Reaper.Services
{
  class GetAccountToReap
  {
    public static async Task<Account> Execute()
    {
      try
      {
        var request = new HttpRequestMessage()
        {
          RequestUri = new Uri("http://accounts-api.bloomebot.com/api/lol_accounts/to_reap"),
          Method = HttpMethod.Get,
        };
        request.Headers.Add("admin_secret_production", "5feb97b14331453fbbe2ba19bc97cc77446cef5f-ce74-4cc4-baee-033dca9c1831");
        var response = await Http.client.SendAsync(request);
        var json = await response.Content.ReadFromJsonAsync<AccountToReapResponse>();
        return new Account(json.account);
      }
      catch (HttpRequestException e)
      {
        Console.WriteLine("\nException Caught!");
        Console.WriteLine("Message :{0} ", e.Message);
        return new Account(new JsonElement());
      }
    }
  }
  class AccountToReapResponse
  {
    public dynamic account { get; set; }
  }
}