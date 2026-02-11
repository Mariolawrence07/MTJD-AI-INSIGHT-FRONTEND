import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Icon } from "@iconify/react";

export default function DocumentUpload({ onBack, onCreated }) {
  const navigate = useNavigate();

  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [context, setContext] = useState(""); // ✅ new
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("accessToken");
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setUploadedFile(file);
      setError("");
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setError("");
    }
  };

  const handleProcess = async () => {
    if (!uploadedFile) return;

    try {
      setIsUploading(true);
      setError("");

      const formData = new FormData();
      formData.append("file", uploadedFile);

      // ✅ send the guidance/context as well
      // trim to avoid sending just whitespace
      if (context.trim()) {
        formData.append("context", context.trim());
      }

      const res = await fetch(`${API_BASE_URL}/api/personas/upload`, {
        method: "POST",
        credentials: "include",
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        body: formData,
      });

      if (!res.ok) {
        let msg = "Upload failed";
        try {
          const data = await res.json();
          msg = data?.message || msg;
        } catch {}
        throw new Error(msg);
      }

      const persona = await res.json();

      onCreated?.(persona);

      navigate(`/personas/${persona.id}`);
    } catch (err) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setIsUploading(false);
    }
  };

  const contextLimit = 1000;
  const contextRemaining = contextLimit - context.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold">Upload Your Documents</h2>
          <p className="text-muted-foreground">
            Upload your survey, questionnaire, or research document and let AI
            extract insights
          </p>
        </div>

        <Card className="p-8 space-y-6">
          {/* Upload drop zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative rounded-lg border-2 border-dashed p-12 text-center transition-colors ${
              isDragging ? "border-primary bg-primary/5" : "border-border"
            }`}
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".pdf,.docx,.csv,.txt"
              onChange={handleFileSelect}
              disabled={isUploading}
            />

            <div className="flex flex-col items-center gap-4">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon icon="ph:upload-simple" className="h-8 w-8" />
              </div>

              <div>
                <p className="mb-2 text-lg font-semibold">
                  Drop your file here or click to browse
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports PDF, DOCX, CSV, and TXT files
                </p>
              </div>

              <Button asChild disabled={isUploading}>
                <label htmlFor="file-upload" className="cursor-pointer">
                  Select File
                </label>
              </Button>
            </div>
          </div>

          {uploadedFile && (
            <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon icon="ph:file-text" className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{uploadedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(uploadedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setUploadedFile(null)}
                disabled={isUploading}
              >
                <Icon icon="ph:x" className="h-5 w-5" />
              </Button>
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {uploadedFile && (
            <div>
              <Button
                className="w-full"
                size="lg"
                onClick={handleProcess}
                disabled={isUploading}
              >
                {isUploading ? "Processing..." : "Process Document"}
                <Icon icon="ph:arrow-right" className="ml-2 h-5 w-5" />
              </Button>

              <p className="mt-2 text-xs text-muted-foreground text-center">
                We’ll use your context to tailor the insights. Leave blank for a
                general analysis.
              </p>
            </div>
          )}
          {/* ✅ Context box */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold">
                  Context / Guidance (optional)
                </h3>
                <p className="text-xs text-muted-foreground">
                  Add any extra instructions to guide the AI output (e.g.,
                  target audience, tone, goals, what to focus on).
                </p>
              </div>
              <span className="text-xs text-muted-foreground">
                {contextRemaining} left
              </span>
            </div>

            <textarea
              className="w-full min-h-[110px] rounded-lg border border-border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-70"
              placeholder='Example: "Focus on pain points and barriers to adoption. Output should be concise and actionable."'
              value={context}
              onChange={(e) => {
                const val = e.target.value;
                // simple limit guard
                if (val.length <= contextLimit) setContext(val);
              }}
              disabled={isUploading}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
