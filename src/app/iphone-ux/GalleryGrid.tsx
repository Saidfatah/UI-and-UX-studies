import { useState, useRef, useCallback } from "react";
import GalleryImage from "./GalleryImage";
import { Image } from "./types";

type GalleryGridProps = {
  images: Image[];
  handleLongPress: (id: string, pos: { x: number; y: number }) => void;
};

const GalleryGrid = ({ images, handleLongPress }: GalleryGridProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragMode, setDragMode] = useState<"select" | "deselect" | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleSelectImage = useCallback((id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const handleMouseDown = useCallback(
    (id: string) => {
      setIsDragging(true);
      setDragMode((prev) => {
        const alreadySelected = selectedIds.includes(id);
        if (alreadySelected) {
          // start deselecting
          setSelectedIds((prev) => prev.filter((x) => x !== id));
          return "deselect";
        } else {
          // start selecting
          setSelectedIds((prev) => [...prev, id]);
          return "select";
        }
      });
    },
    [selectedIds]
  );

  const handleMouseEnter = useCallback(
    (id: string) => {
      if (!isDragging || !dragMode) return;
      setSelectedIds((prev) => {
        if (dragMode === "select" && !prev.includes(id)) {
          return [...prev, id];
        }
        if (dragMode === "deselect" && prev.includes(id)) {
          return prev.filter((x) => x !== id);
        }
        return prev;
      });
    },
    [isDragging, dragMode]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragMode(null);
  }, []);

  return (
    <div
      ref={gridRef}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="grid grid-cols-4 gap-2 select-none"
    >
      {images.map((img) => (
        <GalleryImage
          key={img.id}
          img={img}
          isSelected={selectedIds.includes(img.id)}
          handleSelectImage={() => handleSelectImage(img.id)}
          handleLongPress={handleLongPress}
          onMouseDown={() => handleMouseDown(img.id)}
          onMouseEnter={() => handleMouseEnter(img.id)}
        />
      ))}
    </div>
  );
};

export default GalleryGrid;
