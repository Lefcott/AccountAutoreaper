using System;
using System.Drawing;
using System.Collections.Generic;
using System.Text;

namespace Reaper.Utils
{
    class Image
    {
        public static Bitmap Capture(int x, int y, int width, int height)
        {
            Rectangle rect = new Rectangle(x, y, width, height);
            Bitmap bmp = new Bitmap(rect.Width, rect.Height);
            Graphics graphics = Graphics.FromImage(bmp);
            graphics.CopyFromScreen(rect.Left, rect.Top, 0, 0, bmp.Size, CopyPixelOperation.SourceCopy);
            return bmp;
        }
    }
}
