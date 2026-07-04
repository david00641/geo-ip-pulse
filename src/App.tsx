import { IPDisplay } from '@/components/IPDisplay';
import { Toaster } from '@/components/ui/sonner';
import { motion } from 'framer-motion';

function App() {
  const heroImageUrl = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/07ea4d59-792b-4ff8-ad4a-893ed0c438c9/hero-bg-8da72ce9-1783164535070.webp";

  return (
    <div className="relative min-h-screen bg-background font-sans selection:bg-primary/20">
      {/* Background with Generated Hero Image */}
      <div 
        className="fixed inset-0 z-0 overflow-hidden"
        style={{
          backgroundImage: `url(${heroImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(2px)',
          opacity: 0.15
        }}
      />
      
      {/* Background overlay for dark mode compatibility */}
      <div className="fixed inset-0 z-0 bg-background/85" />

      {/* Dynamic Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-4xl"
        >
          <div className="text-center mb-12 space-y-4">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-5xl md:text-7xl font-black tracking-tight text-foreground"
            >
              IP <span className="text-primary">Detective</span>
            </motion.h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto font-medium">
              Instantly identify your public IP address and discover your network's geographical footprint.
            </p>
          </div>

          <IPDisplay />
        </motion.div>

        <footer className="mt-16 text-sm text-muted-foreground/60 font-medium tracking-tight">
          &copy; {new Date().getFullYear()} IP Detective. Professional Network Tools.
        </footer>
      </main>

      <Toaster position="bottom-right" richColors />
    </div>
  );
}

export default App;
