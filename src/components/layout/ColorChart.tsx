import { type Color } from "colorthief";
import ColorTile from "./ColorTile";

interface ColorChartProps {
  palette: Color[] | null;
}

function ColorChart({ palette }: ColorChartProps) {
  return (
    <div className="w-full grid grid-cols-5 gap-3 my-5">
      {palette?.map((color) => (
        <ColorTile colorObj={color} key={color.hex()} />
      ))}
    </div>
  );
}

export default ColorChart;
