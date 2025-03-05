
import { cn } from "@/lib/utils";

const Footer = ({ className }: { className?: string }) => {
  return (
    <footer className={cn("py-12 px-6 md:px-10 border-t", className)}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 ">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-whisper flex items-center justify-center">
                <span className="text-white font-semibold">S</span>
              </div>
              <span className="font-medium text-lg">StreamShield</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Protecting your privacy in video and audio with advanced AI technology.
            </p>
        
          </div>
        </div>
        
        {/* <div className="mt-16 pt-6 border-t flex flex-col md:flex-row justify-between items-center"> */}
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} StreamShield. All rights reserved.
          </p>
      
        {/* </div> */}
      </div>
    </footer>
  );
};

export default Footer;
