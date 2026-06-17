import { useState, useEffect } from "react";
import { getColorSync, type Color } from "colorthief";
import { colornames } from "color-name-list";
import nearestColor from "nearest-color";
import ImageSelectionWindow from "@/components/layout/ImageSelectionWindow";
import ImageViewerWindow from "@/components/layout/ImageViewerWindow";

// Helper function to convert image from objectUrl to Image object
function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image element"));
    img.src = url;
  });
}

function App() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dominantColor, setDominantColor] = useState<Color | null>(null);
  const [dominantColorName, setDominantColorName] = useState<string | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  const colorMap = colornames.reduce(
    (o, color) => Object.assign(o, { [color.name]: color.hex }),
    {},
  );
  const getNearestColor = nearestColor.from(colorMap);

  // Cleans up object URL if previewURL changes
  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Reset state function
  function clearPreviewUrl() {
    setPreviewUrl(null);
    setDominantColor(null);
    setDominantColorName(null);
    setError(null);
  }

  // On image upload, create object URL, load to Image object, and parse colour palette.
  async function processLocalFile(file: File) {
    setError(null);
    const blobUrl = URL.createObjectURL(file);
    setPreviewUrl(blobUrl);

    try {
      const imgElement = await loadImage(blobUrl);

      // Obtain dominant color
      const color = getColorSync(imgElement);
      setDominantColor(color);

      // Obtain color name
      const match = getNearestColor(color?.hex());
      setDominantColorName(match.name);
    } catch (err) {
      // On failure clear url, and present error
      console.error(err);

      clearPreviewUrl();
      setError("Failed to process image. Please try a different file.");
    }
  }

  return (
    <main
      className="h-dvh flex justify-center items-center bg-cover bg-center"
      style={previewUrl ? { backgroundImage: `url(${previewUrl})` } : {}}
    >
      <div className="w-80 lg:w-100">
        {previewUrl ? (
          <ImageViewerWindow
            onClearPreviewUrl={clearPreviewUrl}
            dominantColor={dominantColor}
            dominantColorName={dominantColorName}
          />
        ) : (
          <ImageSelectionWindow
            onLocalFileSubmit={processLocalFile}
            processingError={error}
          />
        )}
      </div>
    </main>
  );
}

export default App;
