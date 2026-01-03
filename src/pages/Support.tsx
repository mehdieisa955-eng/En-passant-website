import Header from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';

const Support = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-6">{t('support.title')}</h1>
          
          <p className="text-muted-foreground mb-10 leading-relaxed">
            {t('support.subtitle')}
          </p>

          <div className="space-y-10">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">{t('support.coffee')}</h2>
              <a
                href="https://www.buymeacoffee.com/franciscoBSalgueiro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-[#FFDD00] text-black font-medium rounded-lg hover:bg-[#FFDD00]/90 transition-colors border-2 border-[#FFDD00]"
              >
                <span className="text-2xl">☕</span>
                <span className="font-script text-xl" style={{ fontFamily: 'Cookie, cursive' }}>
                  {t('support.coffee')}
                </span>
              </a>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">{t('support.paypal')}</h2>
              <a
                href="https://www.paypal.com/donate/?hosted_button_id=FJWFQZBXW2QGE"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-2 bg-[#FFC439] text-black font-medium rounded hover:bg-[#FFC439]/90 transition-colors"
              >
                {t('support.paypal')}
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Support;
