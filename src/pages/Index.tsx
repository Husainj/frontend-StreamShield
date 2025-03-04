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
                WhisperGuard uses advanced AI to identify and protect sensitive information in your videos and audio.
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

        <section className="py-24 px-6 md:px-10 bg-gradient-to-br from-whisper/5 to-whisper-light/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-whisper/10 text-whisper text-sm font-medium mb-4">
                Testimonials
              </span>
              <h2 className="text-3xl md:text-4xl font-medium mb-6">Trusted by Content Creators</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See what our users are saying about WhisperGuard's privacy protection capabilities.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: "WhisperGuard has been a game-changer for our educational content. We can now ensure student privacy while maintaining high-quality videos.",
                  name: "Sarah Johnson",
                  title: "Educational Content Creator"
                },
                {
                  quote: "The real-time blurring feature is incredibly accurate. It has saved me countless hours of manual editing while protecting my audience's privacy.",
                  name: "Michael Chen",
                  title: "Live Streamer"
                },
                {
                  quote: "As a podcast host, the audio beep feature ensures we never accidentally share sensitive information or inappropriate content with our listeners.",
                  name: "Amanda Rodriguez",
                  title: "Podcast Producer"
                }
              ].map((testimonial, i) => (
                <div key={i} className="p-8 rounded-2xl border bg-white/90 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                  <div className="mb-6 text-2xl text-whisper">"</div>
                  <p className="text-foreground mb-6 italic">{testimonial.quote}</p>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section id="pricing" className="py-24 px-6 md:px-10 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-whisper/10 text-whisper text-sm font-medium mb-4">
                Pricing
              </span>
              <h2 className="text-3xl md:text-4xl font-medium mb-6">Choose the Perfect Plan</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Simple, transparent pricing for all your privacy protection needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Basic",
                  price: "$9",
                  description: "Perfect for personal use",
                  features: [
                    "Process up to 10 minutes of content daily",
                    "Basic blur and beep functionality",
                    "720p output quality",
                    "Email support"
                  ],
                  popular: false,
                  buttonText: "Get Started"
                },
                {
                  name: "Pro",
                  price: "$19",
                  description: "Great for content creators",
                  features: [
                    "Process up to 60 minutes of content daily",
                    "Advanced detection algorithms",
                    "1080p output quality",
                    "Priority support"
                  ],
                  popular: true,
                  buttonText: "Get Started"
                },
                {
                  name: "Enterprise",
                  price: "$49",
                  description: "For businesses and teams",
                  features: [
                    "Unlimited processing",
                    "Custom detection rules",
                    "4K output quality",
                    "Dedicated support manager"
                  ],
                  popular: false,
                  buttonText: "Contact Sales"
                }
              ].map((plan, i) => (
                <div 
                  key={i} 
                  className={`p-8 rounded-2xl border relative ${
                    plan.popular ? "border-whisper shadow-lg" : "bg-white border-border hover:shadow-md"
                  } transition-all duration-300`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-whisper text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-xl font-medium mb-2">{plan.name}</h3>
                  <div className="flex items-end gap-1 mb-2">
                    <span className="text-3xl font-semibold">{plan.price}</span>
                    <span className="text-muted-foreground mb-1">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, fi) => (
                      <div key={fi} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-whisper/10 text-whisper flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckIcon className="w-3 h-3" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button 
                    className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                      plan.popular 
                        ? "bg-whisper hover:bg-whisper-dark text-white" 
                        : "bg-whisper/10 text-whisper hover:bg-whisper/20"
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-24 px-6 md:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-medium mb-6">Ready to Protect Your Privacy?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start using WhisperGuard today and experience the peace of mind that comes with automatic privacy protection.
            </p>
            <button className="bg-whisper hover:bg-whisper-dark text-white px-8 py-3 rounded-lg shadow-sm transition-all duration-300 hover:shadow">
              Get Started for Free
            </button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
