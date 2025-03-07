import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VirtualCamera from "@/components/VirtualCamera";

const StreamWithPrivacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Stream with Privacy</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Stream your screen with built-in privacy protection. Perfect for presentations,
            tutorials, or any content where you need to ensure sensitive information stays private.
          </p>
          
          <div className="space-y-8">
            <VirtualCamera />
            
            <div className="bg-card p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">How it Works</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  1. Click "Start Virtual Camera" to begin the privacy-protected screen capture.
                </p>
                <p className="text-muted-foreground">
                  2. Select "OBS Virtual Camera" as your camera source in your streaming or video conferencing app.
                </p>
                <p className="text-muted-foreground">
                  3. Your screen will be automatically processed to blur sensitive information in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StreamWithPrivacy;
