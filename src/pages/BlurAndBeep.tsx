import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UploadIcon, DownloadIcon , X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import axios from "axios";

const BlurAndBeep = () => {
  const [file, setFile] = useState<File | null>(null);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFile, setProcessedFile] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
    const [badWords, setBadWords] = useState<string[]>([]); // List of words to censor
    const [wordInput, setWordInput] = useState(""); // Current input value

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (!selectedFile.type.startsWith("video/")) {
        toast.error("Please select a video file");
        return;
      }
      if (selectedFile.size > 100 * 1024 * 1024) {
        // 100MB limit
        toast.error("File size must be less than 100MB");
        e.target.value = "";
        return;
      }
      setFile(selectedFile);
      setProcessedFile(null);
      setUploadProgress(0);
    }
  };

 const handleWordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWordInput(e.target.value);
  };

  const handleWordSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && wordInput.trim()) {
      setBadWords([...badWords, wordInput.trim()]);
      setWordInput(""); // Clear input after adding
    }
  };

  const removeWord = (wordToRemove: string) => {
    setBadWords(badWords.filter(word => word !== wordToRemove));
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please select a file to process");
      return;
    }

    setIsProcessing(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("processOption", "beep_audio");
    if (badWords.length > 0) {
      formData.append('badWords', JSON.stringify(badWords)); // Send words as JSON string
    }
    try {
      const response = await axios.post("/api/process-media", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
        onUploadProgress: (progressEvent) => {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          setUploadProgress(Math.round(progress));
        },
        timeout: 300000, // 5 minute timeout
      });

      const processedFileUrl = URL.createObjectURL(response.data);
      setProcessedFile(processedFileUrl);
      toast.success("Video processed successfully");
    } catch (error: any) {
      console.error("Error processing video:", error);
      let errorMessage = "Error processing media file";

      if (error.response) {
        try {
          const blob = error.response.data;
          const text = await blob.text();
          const errorData = JSON.parse(text);
          errorMessage = errorData.detail || errorMessage;
        } catch (e) {
          errorMessage = "Server error: " + error.response.status;
        }
      } else if (error.code === "ECONNABORTED") {
        errorMessage =
          "Request timed out. The file might be too large or the server is busy.";
      } else if (!error.response) {
        errorMessage = "Network error. Please check your connection.";
      }

      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (processedFile) {
      const link = document.createElement("a");
      link.href = processedFile;
      link.download = `processed-${file?.name || "video"}`;
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
            Blur and Beep
          </span>
          <h1 className="text-3xl md:text-4xl font-medium mb-6">
            Process Video
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your video file to automatically blur faces and beep out
            sensitive audio content.
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
                  <p className="text-lg font-medium">Upload your video</p>
                  <p className="text-sm text-muted-foreground">
                    Drag and drop or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    MP4, MOV up to 100MB
                  </p>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="video/mp4,video/mov"
                  className="hidden"
                />
              </div>
            </div>

            <div className="w-full">
              <input
                type="text"
                value={wordInput}
                onChange={handleWordInputChange}
                onKeyDown={handleWordSubmit}
                placeholder="Enter a word to censor and press Enter"
                className="w-full p-2 border rounded-md bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-whisper"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {badWords.map((word, index) => (
                  <div key={index} className="flex items-center bg-whisper/20 px-2 py-1 rounded-full">
                    <span>{word}</span>
                    <button
                      onClick={() => removeWord(word)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {(file ) && (
              <div className="w-full space-y-4">
                {file && (
                  <p className="text-sm">
                    Selected media:{" "}
                    <span className="font-medium">{file.name}</span> (
                    {(file.size / (1024 * 1024)).toFixed(2)} MB)
                  </p>
                )}
                <Button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="w-full bg-whisper hover:bg-whisper-dark text-white"
                >
                  {isProcessing ? (
                    <>
                      <span className="mr-2">Processing...</span>
                      {uploadProgress}%
                    </>
                  ) : (
                    "Process Video"
                  )}
                </Button>
              </div>
            )}

            {processedFile && (
              <div className="w-full space-y-4">
                {/* <div className="border rounded-xl p-4">
                  <video
                    src={processedFile}
                    controls
                    className="w-full h-auto"
                  />
                </div> */}
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

export default BlurAndBeep;
