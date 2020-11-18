using System;
using System.IO;
using System.Drawing;
using Tesseract;

namespace Reaper.Utils
{
	public class Ocr
    {
        public static string ReadFromFile(string imagePath)
        {
            string text = "";
            try
            {
                using (var engine = new TesseractEngine("./tessdata", "eng"))
                {
                    using (var image = Pix.LoadFromFile(imagePath))
                    {
                        using (var page = engine.Process(image))
                        {
                            text = page.GetText();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            Console.WriteLine("This is the text");
            Console.WriteLine(text);
            return text;
        }
        public static string ReadFromScreenRect(int x, int y, int width, int height)
        {
            string text = "";
            Bitmap bitmap = Image.Capture(x, y, width, height);
            try
            {
                using (var engine = new TesseractEngine("./tessdata", "eng"))
                {
                    using (var image = Pix.LoadFromMemory(ImageToByte(bitmap)))
                    {
                        using (var page = engine.Process(image))
                        {
                            text = page.GetText();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return text;
        }
        public static byte[] ImageToByte(System.Drawing.Image image)
        {
            ImageConverter converter = new ImageConverter();
            return (byte[])converter.ConvertTo(image, typeof(byte[]));
        }
    }
}
