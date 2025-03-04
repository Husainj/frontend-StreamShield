
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UploadIcon, DownloadIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const BeepAudio = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFile, setProcessedFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // Accept both audio and video formats
      if (!selectedFile.type.startsWith('audio/') && !selectedFile.type.startsWith('video/')) {
        toast.error("Please select an audio or video file");
        return;
      }
      setFile(selectedFile);
      setProcessedFile(null);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please select a file to process");
      return;
    }

    setIsProcessing(true);

    try {
      // In a real application, you would send the file to a backend API
      // For this demo, we'll simulate a processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate receiving processed file
      const processedFileUrl = URL.createObjectURL(file);
      setProcessedFile(processedFileUrl);
      toast.success("Audio processed successfully");
    } catch (error) {
      console.error("Error processing audio:", error);
      toast.error("Error processing audio");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (processedFile) {
      const link = document.createElement('a');
      link.href = processedFile;
      link.download = `beeped-${file?.name || 'file'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-whisper-light/50">
      <Header />
      <main className="py-24 px-6 md:px-10 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-whisper/10 text-whisper text-sm font-medium mb-4">
            Beep Audio
          </span>
          <h1 className="text-3xl md:text-4xl font-medium mb-6">Process Audio</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your audio or video file to automatically identify and beep out inappropriate language, personal information, and sensitive content.
          </p>
        </div>

        <Card className="p-8 rounded-2xl glass-card">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div 
              className="border-2 border-dashed border-whisper/30 rounded-xl p-8 w-full cursor-pointer hover:border-whisper/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-whisper/10 rounded-full">
                  <UploadIcon className="h-8 w-8 text-whisper" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-medium">Upload your file</p>
                  <p className="text-sm text-muted-foreground">Drag and drop or click to browse</p>
                  <p className="text-xs text-muted-foreground mt-2">MP3, WAV, MP4, MOV up to 100MB</p>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="audio/mp3,audio/wav,video/mp4,video/mov"
                  className="hidden"
                />
              </div>
            </div>

            {file && (
              <div className="w-full">
                <p className="text-sm mb-2">
                  Selected file: <span className="font-medium">{file.name}</span>
                </p>
                <Button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="w-full bg-whisper hover:bg-whisper-dark text-white"
                >
                  {isProcessing ? "Processing..." : "Process Audio"}
                </Button>
              </div>
            )}

            {processedFile && (
              <div className="w-full space-y-4">
                <div className="border rounded-xl p-4">
                  {file?.type.startsWith('video/') ? (
                    <video 
                      src={processedFile} 
                      controls 
                      className="w-full h-auto"
                    />
                  ) : (
                    <audio 
                      src={processedFile} 
                      controls 
                      className="w-full"
                    />
                  )}
                </div>
                <Button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <DownloadIcon className="h-4 w-4" />
                  Download Processed File
                </Button>
              </div>
            )}
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default BeepAudio;
