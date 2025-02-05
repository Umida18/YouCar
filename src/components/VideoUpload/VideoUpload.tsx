import { Input } from "antd";
import { useState } from "react";

interface VideoInputProps {
  onVideoChange: (url: string) => void;
}

export function VideoInput({ onVideoChange }: VideoInputProps) {
  const [videoUrl, setVideoUrl] = useState("");
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    if (videoUrl) {
      onVideoChange(videoUrl);
      setIsAdded(true);
    }
  };

  const handleRemove = () => {
    setVideoUrl("");
    setIsAdded(false);
    onVideoChange("");
  };

  return (
    <div className="space-y-4">
      {!isAdded ? (
        <div className="flex gap-2">
          <Input
            placeholder="Ссылка на YouTube"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="bg-muted border-0"
          />
          <button onClick={handleAdd}>Добавить</button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <img
            src="/placeholder.svg"
            alt="Video thumbnail"
            width={80}
            height={60}
            className="rounded"
          />
          <div className="flex-1 text-sm truncate">{videoUrl}</div>
          <button
            className="text-blue-500 hover:text-blue-600"
            onClick={handleRemove}
          >
            Удалить
          </button>
        </div>
      )}
    </div>
  );
}
