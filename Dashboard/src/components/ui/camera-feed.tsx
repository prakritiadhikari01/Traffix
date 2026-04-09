type Props = {
  direction: "north" | "south" | "east" | "west";
  isGreen: boolean;
};

export function CameraFeed({ direction, isGreen }: Props) {
  const videoSrc = `/videos/${direction}.mp4`;

  return (
    <div
      className={`rounded-md p-4 flex flex-col items-center justify-center transition-shadow ${
        isGreen
          ? "border-4 border-green-500 shadow-lg shadow-green-200 bg-green-50"
          : "bg-muted"
      }`}
    >
      {/* Direction label */}
      <div className="text-base font-semibold mb-2 capitalize">{direction}</div>

      {/* Video container */}
      <div className="w-full aspect-video bg-slate-100 rounded overflow-hidden">
        <video
          src={videoSrc}
          controls
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
