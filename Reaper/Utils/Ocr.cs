using System;
using IronOcr;

namespace Reaper.Utils
{
  public class Ocr
  {
    public static void Read()
    {
      var Ocr = new AutoOcr();
      var Result = Ocr.Read($"utils/image.png");
      // var Result = new IronTesseract().Read("utils/image.png").Text;
      Console.WriteLine(Result);
    }
  }
}