import { useGreenDirection } from "@/hooks/useGreenDirection";
import { CameraFeed } from "./camera-feed";

export function AllDirections() {
  const greenDirection = useGreenDirection();

  const directions: ("north" | "south" | "east" | "west")[] = [
    "north",
    "south",
    "east",
    "west",
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {directions.map((dir) => (
        <CameraFeed key={dir} direction={dir} isGreen={dir === greenDirection} />
      ))}
    </div>
  );
}
