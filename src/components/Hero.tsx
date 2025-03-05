import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon, EyeOffIcon, AudioWaveformIcon, ShieldCheckIcon } from "lucide-react";
import FeatureCard from "./FeatureCard";

const Hero = () => {
  const [selectedFeature, setSelectedFeature] = useState<number>(0);

  const features = [
    {
      id: 0,
      title: "Blur & Beep",
      description: "Automatically detect and blur visual sensitive information while beeping inappropriate audio",
      icon: <ShieldCheckIcon className="w-7 h-7" />,
      linkTo: "/blur-and-beep"
    },
    {
      id: 1,
      title: "Blur Video",
      description: "Blur faces, text, and other sensitive information in real-time or recorded video",
      icon: <EyeOffIcon className="w-7 h-7" />,
      linkTo: "/blur-video"
    },
    {
      id: 2,
      title: "Beep Audio",
      description: "Identify and beep out inappropriate language, personal information, and sensitive content",
      icon: <AudioWaveformIcon className="w-7 h-7" />,
      linkTo: "/beep-audio"
    }
  ];

  return (
    <section className="pt-32 pb-16 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
        <span className="inline-block px-4 py-1 rounded-full bg-whisper/10 text-whisper text-sm font-medium mb-4">
          Privacy Protection Made Simple
        </span>
        <h1 className="text-4xl md:text-5xl xl:text-6xl font-medium mb-6 tracking-tight text-balance">
          Protect Your Privacy with Intelligent Blurring & Audio Filtering
        </h1>
        <p className="text-lg text-muted-foreground mb-8 mx-auto max-w-2xl text-balance">
          StreamShield automatically detects and protects sensitive information in your videos and audio with advanced AI technology.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      
          <Button variant="outline" className="min-w-40 h-12 rounded-lg">
            Watch Demo
          </Button>
        </div>
      </div>

      <div className="relative mt-24 mb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-whisper/5 to-transparent rounded-3xl -z-10"></div>
        <div className="max-w-5xl mx-auto glass-card rounded-3xl p-8 lg:p-12 animate-blur-in">
          <div className="w-full aspect-[16/9] bg-whisper-muted rounded-xl overflow-hidden relative mb-8">
            <video 
              className="w-full h-full object-cover"
              controls
              playsInline
              poster="/video-placeholder.png"
            >
              <source src="../assets/demoVideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {features.map((feature) => (
              <FeatureCard
                key={feature.id}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                active={selectedFeature === feature.id}
                onClick={() => setSelectedFeature(feature.id)}
                linkTo={feature.linkTo}
                className={`animate-slide-up stagger-${feature.id + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-24 text-center animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-medium mb-6">Why Choose StreamShield?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {[
            {
              icon: <CheckIcon className="w-6 h-6 text-whisper" />,
              title: "Real-time Protection",
              description: "Process video and audio on-the-fly with minimal latency"
            },
            {
              icon: <CheckIcon className="w-6 h-6 text-whisper" />,
              title: "Advanced AI",
              description: "Powered by state-of-the-art machine learning models"
            },
            {
              icon: <CheckIcon className="w-6 h-6 text-whisper" />,
              title: "Privacy First",
              description: "Your data never leaves your device, ensuring complete privacy"
            },
            {
              icon: <CheckIcon className="w-6 h-6 text-whisper" />,
              title: "Easy Integration",
              description: "Works with your favorite video and audio applications"
            }
          ].map((item, i) => (
            <div key={i} className={`p-6 rounded-xl bg-white border shadow-sm animate-slide-up stagger-${i + 1}`}>
              <div className="w-12 h-12 rounded-full bg-whisper/10 flex items-center justify-center mb-4 mx-auto">
                {item.icon}
              </div>
              <h3 className="text-lg font-medium mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
