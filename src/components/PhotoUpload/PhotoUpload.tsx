import { Camera } from "lucide-react";
import { useState } from "react";

interface PhotoUploadProps {
  onPhotosChange: (photos: File[]) => void;
}

export function PhotoUpload({ onPhotosChange }: PhotoUploadProps) {
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files);
      setPhotos([...photos, ...newPhotos]);

      const newPreviews = newPhotos.map((photo) => URL.createObjectURL(photo));
      setPreviews([...previews, ...newPreviews]);

      onPhotosChange([...photos, ...newPhotos]);
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);

    URL.revokeObjectURL(previews[index]);

    setPhotos(newPhotos);
    setPreviews(newPreviews);
    onPhotosChange(newPhotos);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {previews.map((preview, index) => (
          <div key={index} className="relative">
            <img
              src={preview || "/placeholder.svg"}
              alt={`Car photo ${index + 1}`}
              width={120}
              height={120}
              className="rounded-lg object-cover"
            />
            <button
              onClick={() => removePhoto(index)}
              className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm"
            >
              ×
            </button>
          </div>
        ))}
        <label className="cursor-pointer">
          <div className="w-[120px] h-[120px] rounded-lg bg-muted flex flex-col items-center justify-center gap-2">
            <Camera className="w-6 h-6 text-muted-foreground" />
            <span className="text-sm text-primary">Добавить фото</span>
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handlePhotoUpload}
          />
        </label>
      </div>
    </div>
  );
}
