import { useState, useEffect, useRef } from "react";
import { getColorSync, type Color } from "colorthief";
import { colornames } from "color-name-list";
import nearestColor from "nearest-color";
import ImageSelectionWindow from "@/components/layout/ImageSelectionWindow";
import ImageViewerWindow from "@/components/layout/ImageViewerWindow";

const backgroundAssets = Object.values(
  import.meta.glob(
    "./assets/images/*.{png,jpg,jpeg,webp,gif,bmp,PNG,JPG,JPEG}",
    {
      eager: true,
      import: "default",
    },
  ),
) as string[];

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (!url.startsWith("blob:")) {
      img.crossOrigin = "anonymous";
    }
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image element"));
    img.src = url;
  });
}

function App() {
  // Split states: One for the background, one for the active view toggle
  const [bgUrl, setBgUrl] = useState<string | null>(null);
  const [isViewingActive, setIsViewingActive] = useState<boolean>(false);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);

  const [dominantColor, setDominantColor] = useState<Color | null>(null);
  const [dominantColorName, setDominantColorName] = useState<string | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const currentRequestId = useRef(0);

  const colorMap = colornames.reduce(
    (o, color) => Object.assign(o, { [color.name]: color.hex }),
    {},
  );
  const getNearestColor = nearestColor.from(colorMap);

  // Clean up old blob URLs when background changes
  useEffect(() => {
    return () => {
      if (bgUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(bgUrl);
      }
    };
  }, [bgUrl]);

  // Load random image on start
  useEffect(() => {
    if (backgroundAssets.length > 0) {
      const randomIndex = Math.floor(Math.random() * backgroundAssets.length);
      processImageByUrl(backgroundAssets[randomIndex]).finally(() =>
        setIsInitializing(false),
      );
    }
  }, []);

  async function processImageByUrl(url: string) {
    const requestId = ++currentRequestId.current;

    setError(null);
    setDominantColor(null);
    setDominantColorName(null);
    setBgUrl(url);

    try {
      const imgElement = await loadImage(url);
      if (requestId !== currentRequestId.current) return;

      const color = getColorSync(imgElement);
      setDominantColor(color);

      const match = getNearestColor(color?.hex());
      setDominantColorName(match.name);
      setIsViewingActive(true);
    } catch (err) {
      if (requestId !== currentRequestId.current) return;
      console.error(err);
      clearViewOnly();
      setError("Failed to process image.");
    }
  }

  async function processLocalFile(file: File) {
    const blobUrl = URL.createObjectURL(file);
    await processImageByUrl(blobUrl);
  }

  // Closes the info card to show the upload form, but LEAVES the background image intact
  function clearViewOnly() {
    setIsViewingActive(false);
    setError(null);
  }

  return (
    <main
      className="h-dvh flex justify-center items-center bg-cover bg-center opacity-90 transition-all duration-500"
      style={bgUrl ? { backgroundImage: `url(${bgUrl})` } : {}}
    >
      <div className="w-80 lg:w-100">
        {isInitializing ? null : isViewingActive ? (
          <ImageViewerWindow
            onClearPreviewUrl={clearViewOnly} // Simply hides the viewer card
            dominantColor={dominantColor}
            dominantColorName={dominantColorName}
          />
        ) : (
          <ImageSelectionWindow
            onLocalFileSubmit={processLocalFile}
            processingError={error}
            showCancel={dominantColor !== null}
            onCancel={() => setIsViewingActive(true)}
          />
        )}
      </div>
    </main>
  );
}

export default App;
