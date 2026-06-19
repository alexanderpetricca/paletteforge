import { type Color } from "colorthief";
import { Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CopyButton from "@/components/layout/CopyButton";

interface ImageViewerWindowProps {
  onClearPreviewUrl: () => void;
  dominantColor: Color | null;
  dominantColorName: string | null;
}

function ImageViewerWindow({
  onClearPreviewUrl,
  dominantColor,
  dominantColorName,
}: ImageViewerWindowProps) {
  const hexCode = dominantColor?.hex();
  const rgbCode = dominantColor?.css();
  const oklchCode = dominantColor?.css("oklch");
  const textColor = dominantColor?.textColor;

  return (
    <div className="relative">
      <Card
        style={{ backgroundColor: dominantColor?.hex() }}
        className="aspect-square py-10 px-5"
      >
        <CardContent
          style={{ color: textColor, borderColor: textColor }}
          className="h-full flex flex-col justify-between"
        >
          <h2 className="text-3xl font-extrabold mb-5">
            {dominantColorName?.split(" ").map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h2>
          <div className="flex justify-between items-end">
            <div className="text-sm font-semibold">
              <div className="flex items-center gap-1">
                {hexCode}{" "}
                <CopyButton
                  copyValue={hexCode ?? ""}
                  textColor={textColor ?? "000000"}
                />
              </div>
              <div className="flex items-center gap-1">
                {rgbCode}{" "}
                <CopyButton
                  copyValue={rgbCode ?? ""}
                  textColor={textColor ?? "000000"}
                />
              </div>
              <div className="flex items-center gap-1">
                {oklchCode}{" "}
                <CopyButton
                  copyValue={oklchCode ?? ""}
                  textColor={textColor ?? "000000"}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          type="button"
          onClick={onClearPreviewUrl}
          variant="outline"
          className="hover:cursor-pointer flex gap-1 opacity-50"
        >
          <Image />
          Change Image
        </Button>
      </div>
    </div>
  );
}

export default ImageViewerWindow;
