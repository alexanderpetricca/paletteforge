import { useState, useEffect } from "react";
import { CheckIcon } from "lucide-react";
import { type Color } from "colorthief";

interface ColorTileProps {
  colorObj: Color;
}

function ColorTile({ colorObj }: ColorTileProps) {
  const [copied, setCopied] = useState(false);
  const hexCode: string = colorObj.hex();
  const textColor: string = colorObj.textColor;

  function handleCopy() {
    navigator.clipboard.writeText(hexCode);
    setCopied(true);
  }

  useEffect(() => {
    if (!copied) return;

    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <button
      onClick={handleCopy}
      style={{ backgroundColor: hexCode, color: textColor }}
      className="w-full aspect-square text-xs lg:text-sm rounded border border-neutral-300 flex justify-center items-center hover:cursor-pointer"
    >
      <div className="flex items-center">
        {copied ? <CheckIcon /> : hexCode}
      </div>
    </button>
  );
}

export default ColorTile;
