import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import FeatureCard from '@/components/FeatureCard';
import { useLanguage } from '@/contexts/LanguageContext';
import logo from '@/assets/large-logo.webp';
import showcase from '@/assets/showcase.webp';

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-2">
                <span className="text-primary">{t('hero.title')}</span>
              </h1>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                {t('hero.subtitle')}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {t('hero.description')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/download"
                  className="px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
                >
                  {t('hero.download')}
                </Link>
                <a
                  href="https://github.com/franciscoBSalgueiro/en-croissant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-secondary text-foreground font-medium rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  {t('hero.github')}
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img
                src={logo}
                alt="En Croissant Logo"
                className="w-64 h-64 lg:w-80 lg:h-80 object-contain"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              emoji="📈"
              title={t('feature.analysis.title')}
              description={t('feature.analysis.desc')}
            />
            <FeatureCard
              emoji="📁"
              title={t('feature.database.title')}
              description={t('feature.database.desc')}
            />
            <FeatureCard
              emoji="📥"
              title={t('feature.download.title')}
              description={t('feature.download.desc')}
            />
          </div>
        </section>

        {/* Showcase Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-xl overflow-hidden border border-border">
            <img
              src={showcase}
              alt={t('showcase.caption')}
              className="w-full"
            />
          </div>
          <p className="text-center text-muted-foreground mt-4">
            {t('showcase.caption')}
          </p>
        </section>
      </main>
    </div>
  );
};

export default Index;
