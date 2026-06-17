import { type Color } from "colorthief";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import ColorChart from "./ColorChart";

interface ImageViewerWindowProps {
  previewUrl: string;
  onClearPreviewUrl: () => void;
  palette: Color[] | null;
  isLandscape: boolean;
}

function ImageViewerWindow({
  previewUrl,
  onClearPreviewUrl,
  palette,
  isLandscape,
}: ImageViewerWindowProps) {
  console.log(isLandscape);

  return (
    <Card className="pt-7">
      <CardContent>
        <img
          src={previewUrl}
          alt="User uploaded image"
          className="w-full mb-10 rounded"
        />
        <ColorChart palette={palette} />
      </CardContent>
      <CardFooter className="flex-col gap-2 mt-auto">
        <Button type="button" onClick={onClearPreviewUrl} variant="outline">
          Change Image
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ImageViewerWindow;
