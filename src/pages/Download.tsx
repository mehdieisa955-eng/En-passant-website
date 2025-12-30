import Header from '@/components/Header';
import { Download as DownloadIcon } from 'lucide-react';

const Download = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-6">Download</h1>
          
          <p className="text-muted-foreground mb-10 leading-relaxed">
            En Croissant is available for Windows, macOS, and Linux. Choose your platform below to download the latest version.
          </p>

          <div className="space-y-6">
            <div className="feature-card">
              <h2 className="text-xl font-bold text-foreground mb-2">Windows</h2>
              <p className="text-muted-foreground text-sm mb-4">
                Download the installer for Windows 10 or later.
              </p>
              <a
                href="https://github.com/franciscoBSalgueiro/en-croissant/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <DownloadIcon className="w-4 h-4" />
                Download for Windows
              </a>
            </div>

            <div className="feature-card">
              <h2 className="text-xl font-bold text-foreground mb-2">macOS</h2>
              <p className="text-muted-foreground text-sm mb-4">
                Download the DMG for macOS 10.15 or later.
              </p>
              <a
                href="https://github.com/franciscoBSalgueiro/en-croissant/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <DownloadIcon className="w-4 h-4" />
                Download for macOS
              </a>
            </div>

            <div className="feature-card">
              <h2 className="text-xl font-bold text-foreground mb-2">Linux</h2>
              <p className="text-muted-foreground text-sm mb-4">
                Download the AppImage or .deb for Linux distributions.
              </p>
              <a
                href="https://github.com/franciscoBSalgueiro/en-croissant/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <DownloadIcon className="w-4 h-4" />
                Download for Linux
              </a>
            </div>
          </div>

          <p className="text-muted-foreground text-sm mt-8">
            View all releases on{' '}
            <a
              href="https://github.com/franciscoBSalgueiro/en-croissant/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              GitHub
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Download;
