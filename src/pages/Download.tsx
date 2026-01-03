import Header from '@/components/Header';
import { Download as DownloadIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Download = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-6">{t('download.title')}</h1>
          
          <p className="text-muted-foreground mb-10 leading-relaxed">
            {t('download.subtitle')}
          </p>

          <div className="space-y-6">
            <div className="feature-card">
              <h2 className="text-xl font-bold text-foreground mb-2">{t('download.windows')}</h2>
              <p className="text-muted-foreground text-sm mb-4">
                {t('download.windows-desc')}
              </p>
              <a
                href="https://github.com/franciscoBSalgueiro/en-croissant/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <DownloadIcon className="w-4 h-4" />
                {t('download.download-for')} {t('download.windows')}
              </a>
            </div>

            <div className="feature-card">
              <h2 className="text-xl font-bold text-foreground mb-2">{t('download.mac')}</h2>
              <p className="text-muted-foreground text-sm mb-4">
                {t('download.mac-desc')}
              </p>
              <a
                href="https://github.com/franciscoBSalgueiro/en-croissant/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <DownloadIcon className="w-4 h-4" />
                {t('download.download-for')} {t('download.mac')}
              </a>
            </div>

            <div className="feature-card">
              <h2 className="text-xl font-bold text-foreground mb-2">{t('download.linux')}</h2>
              <p className="text-muted-foreground text-sm mb-4">
                {t('download.linux-desc')}
              </p>
              <a
                href="https://github.com/franciscoBSalgueiro/en-croissant/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <DownloadIcon className="w-4 h-4" />
                {t('download.download-for')} {t('download.linux')}
              </a>
            </div>
          </div>

          <p className="text-muted-foreground text-sm mt-8">
            {t('download.all-releases')}{' '}
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
