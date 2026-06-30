"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type Crop,
  type PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import type { Project } from "@/db/schema";

type Still = { url: string; type: string; order: number };

type AspectKey = "16:9" | "4:3" | "1:1";

const ASPECTS: Record<AspectKey, number> = {
  "16:9": 16 / 9,
  "4:3": 4 / 3,
  "1:1": 1,
};

interface ImageManagerProps {
  project: Project;
  onClose: () => void;
  onUpdate: () => void;
}

export default function ImageManager({ project, onClose, onUpdate }: ImageManagerProps) {
  const [stills, setStills] = useState<Still[]>(
    (project.stills as Still[] | null)?.sort((a, b) => a.order - b.order) || []
  );
  const [cropUrl, setCropUrl] = useState<string | null>(null);
  const [cropIndex, setCropIndex] = useState<number | null>(null);
  const [crop, setCrop] = useState<Crop | null>(null);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileUpload = useCallback(
    async (files: FileList | null) => {
      if (!files) return;
      setUploading(true);
      setUploadError(null);
      const next: Still[] = [];
      try {
        for (const file of Array.from(files)) {
          if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) continue;
          const fd = new FormData();
          fd.append("file", file);
          const res = await fetch("/api/upload", { method: "POST", body: fd });
          const data = await res.json();
          if (!res.ok) {
            setUploadError(data.error || "Falha no upload.");
            continue;
          }
          next.push({
            url: data.url,
            type: file.type.startsWith("video/") ? "video" : "app-screen",
            order: stills.length + next.length,
          });
        }
        setStills([...stills, ...next].map((s, i) => ({ ...s, order: i })));
      } finally {
        setUploading(false);
      }
    },
    [stills]
  );

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(stills);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setStills(items.map((s, i) => ({ ...s, order: i })));
  };

  const updateStillType = (index: number, type: string) => {
    setStills(stills.map((s, i) => (i === index ? { ...s, type } : s)));
  };

  const removeStill = (index: number) => {
    setStills(stills.filter((_, i) => i !== index).map((s, i) => ({ ...s, order: i })));
  };

  const openCrop = (url: string, index: number) => {
    setCropUrl(url);
    setCropIndex(index);
    setCrop(null);
    setCompletedCrop(null);
  };

  const onImgLoad = () => {
    const img = imgRef.current;
    if (!img) return;
    const aspect = ASPECTS["16:9"];
    setCrop(
      centerCrop(
        makeAspectCrop({ unit: "%", width: 90 }, aspect, img.naturalWidth, img.naturalHeight),
        img.naturalWidth,
        img.naturalHeight
      )
    );
  };

  const applyCrop = async () => {
    if (!imgRef.current || !completedCrop || cropIndex === null) return;
    const img = imgRef.current;
    const canvas = document.createElement("canvas");
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(
      img,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );
    const newUrl = canvas.toDataURL("image/webp", 0.92);
    setStills(stills.map((s, i) => (i === cropIndex ? { ...s, url: newUrl } : s)));
    setCropUrl(null);
    setCropIndex(null);
  };

  const save = async () => {
    await fetch(`/api/projects/${project.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...project, stills }),
    });
    onUpdate();
    onClose();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-bg/80 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        className="fixed inset-x-4 top-[5vh] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[800px] max-h-[85vh] overflow-y-auto bg-bg-elevated border border-border rounded-2xl z-50"
      >
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-black tracking-tight font-display text-fg">
                Imagens do Case
              </h2>
              <p className="text-xs text-fg-dim mt-1">{project.title}</p>
            </div>
            <button onClick={onClose} className="text-fg-dim hover:text-fg transition-colors">✕</button>
          </div>

          <label
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFileUpload(e.dataTransfer.files);
            }}
            className="flex flex-col items-center justify-center gap-3 py-10 border border-dashed border-border rounded-xl bg-bg cursor-pointer hover:border-accent/50 transition-colors"
          >
            <div className="text-[10px] tracking-[0.2em] uppercase text-fg-dim font-mono text-center">
              {uploading ? "Enviando…" : "Arraste imagens / vídeos ou clique para upload"}
            </div>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              className="hidden"
              disabled={uploading}
              onChange={(e) => handleFileUpload(e.target.files)}
            />
          </label>
          {uploadError && (
            <p className="mt-3 text-[11px] text-red-400 font-mono">{uploadError}</p>
          )}

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="stills" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6"
                >
                  {stills.map((still, index) => (
                    <Draggable key={`${still.url}-${index}`} draggableId={`${still.url}-${index}`} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="bg-bg border border-border rounded-xl overflow-hidden"
                        >
                          <div className="aspect-video relative group">
                            <img
                              src={still.url}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              {...provided.dragHandleProps}
                              className="absolute top-2 left-2 px-2 py-1 bg-bg/80 rounded text-[10px] text-fg-dim cursor-grab active:cursor-grabbing"
                            >
                              ⠿
                            </button>
                            <button
                              type="button"
                              onClick={() => removeStill(index)}
                              className="absolute top-2 right-2 w-6 h-6 bg-bg/80 rounded flex items-center justify-center text-fg-dim hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ✕
                            </button>
                            <button
                              type="button"
                              onClick={() => openCrop(still.url, index)}
                              className="absolute bottom-2 right-2 px-2 py-1 bg-bg/80 rounded text-[10px] text-fg-dim hover:text-accent opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              Crop
                            </button>
                          </div>
                          <div className="p-3">
                            <select
                              value={still.type}
                              onChange={(e) => updateStillType(index, e.target.value)}
                              className="w-full bg-bg border border-border rounded px-2 py-1.5 text-[11px] text-fg outline-none focus:border-accent"
                            >
                              <option value="branding">Branding Asset</option>
                              <option value="component">Component</option>
                              <option value="app-screen">App Screen</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <div className="flex items-center justify-end gap-3 mt-8">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-border text-xs font-bold tracking-[0.1em] uppercase text-fg-dim hover:text-fg hover:border-fg-muted transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={save}
              className="px-5 py-2.5 rounded-full bg-accent text-white text-xs font-bold tracking-[0.1em] uppercase hover:bg-accent-hover transition-colors"
            >
              Salvar Imagens
            </button>
          </div>
        </div>
      </motion.div>

      {cropUrl && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-bg/90 p-6">
          <div className="w-full max-w-2xl bg-bg-elevated border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black font-display text-fg">Recortar Imagem</h3>
              <button onClick={() => setCropUrl(null)} className="text-fg-dim hover:text-fg">✕</button>
            </div>
            <div className="max-h-[60vh] overflow-auto rounded-xl bg-bg">
              <ReactCrop
                crop={crop || undefined}
                onChange={(_, c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={ASPECTS["16:9"]}
              >
                <img ref={imgRef} src={cropUrl} alt="" onLoad={onImgLoad} className="max-w-full" />
              </ReactCrop>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setCropUrl(null)}
                className="px-4 py-2 rounded-full border border-border text-[10px] font-bold tracking-[0.1em] uppercase text-fg-dim hover:text-fg"
              >
                Cancelar
              </button>
              <button
                onClick={applyCrop}
                disabled={!completedCrop}
                className="px-4 py-2 rounded-full bg-accent text-white text-[10px] font-bold tracking-[0.1em] uppercase hover:bg-accent-hover disabled:opacity-40"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
