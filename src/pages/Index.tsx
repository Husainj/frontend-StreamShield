import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { CheckIcon } from "lucide-react";

const Index = () => {
  useEffect(() => {
    // Add a smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== "#") {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
              behavior: 'smooth'
            });
          }
        }
      });
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function() {});
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-whisper-light/50">
      <Header />
      <main>
        <Hero />
        
        <section id="how-it-works" className="py-24 px-6 md:px-10 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-whisper/10 text-whisper text-sm font-medium mb-4">
                How It Works
              </span>
              <h2 className="text-3xl md:text-4xl font-medium mb-6">Simple, Powerful Privacy Protection</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                StreamShield uses advanced AI to identify and protect sensitive information in your videos and audio.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  number: "01",
                  title: "Upload or Stream",
                  description: "Upload your media or connect to a live stream through our secure interface."
                },
                {
                  number: "02",
                  title: "AI Processing",
                  description: "Our AI intelligently identifies sensitive information, faces, and inappropriate language."
                },
                {
                  number: "03",
                  title: "Protected Output",
                  description: "Get your media back with all sensitive content automatically blurred and censored."
                }
              ].map((step, i) => (
                <div key={i} className="p-8 rounded-2xl border bg-white hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-whisper/10 text-whisper font-medium flex items-center justify-center mb-6">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-medium mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
