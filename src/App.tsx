import { useState, useEffect } from "react";
import { getPaletteSync, type Color } from "colorthief";
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
  const [palette, setPalette] = useState<Color[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLandscape, setIsLandscape] = useState<boolean>(false);

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
    setPalette(null);
    setError(null);
    setIsLandscape(false);
  }

  // On image upload, create object URL, load to Image object, and parse colour palette.
  async function processLocalFile(file: File) {
    setError(null);
    const blobUrl = URL.createObjectURL(file);
    setPreviewUrl(blobUrl);

    try {
      const imgElement = await loadImage(blobUrl);

      // Analyse image dimensions
      setIsLandscape(imgElement.width >= imgElement.height);

      // Obtain colour palette
      const extractedPalette = getPaletteSync(imgElement, { colorCount: 5 });
      setPalette(extractedPalette);
    } catch (err) {
      // On failure clear url, and present error
      console.error(err);

      clearPreviewUrl();
      setError("Failed to process image. Please try a different file.");
    }
  }

  return (
    <main className="h-dvh flex justify-center items-center">
      <div className="w-full">
        {previewUrl ? (
          <ImageViewerWindow
            previewUrl={previewUrl}
            onClearPreviewUrl={clearPreviewUrl}
            palette={palette}
            isLandscape={isLandscape}
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
