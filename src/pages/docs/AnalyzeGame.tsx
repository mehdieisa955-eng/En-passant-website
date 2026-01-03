import DocsLayout from '@/components/DocsLayout';
import { useLanguage } from '@/contexts/LanguageContext';

const AnalyzeGame = () => {
  const { t } = useLanguage();

  return (
    <DocsLayout 
      title={t('docs.analyze-game')}
      prevPage={{ title: t('docs.engines'), path: '/docs/engines' }}
      nextPage={{ title: t('docs.manage-repertoire'), path: '/docs/manage-repertoire' }}
    >
      <p className="text-muted-foreground mb-8">
        {t('docs.analyze-intro')}
      </p>

      <h2 className="text-2xl font-bold text-foreground mb-4">{t('docs.importing-games')}</h2>
      <p className="text-muted-foreground mb-6">
        {t('docs.importing-games-desc')}
      </p>

      <h2 className="text-2xl font-bold text-foreground mb-4">{t('docs.running-analysis')}</h2>
      <p className="text-muted-foreground mb-6">
        {t('docs.running-analysis-desc')}
      </p>
    </DocsLayout>
  );
};

export default AnalyzeGame;
