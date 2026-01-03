import DocsLayout from '@/components/DocsLayout';
import { useLanguage } from '@/contexts/LanguageContext';

const ManageRepertoire = () => {
  const { t } = useLanguage();

  return (
    <DocsLayout 
      title={t('docs.manage-repertoire')}
      prevPage={{ title: t('docs.analyze-game'), path: '/docs/analyze-game' }}
      nextPage={{ title: t('docs.configure-engines'), path: '/docs/configure-engines' }}
    >
      <p className="text-muted-foreground mb-8">
        {t('docs.repertoire-intro')}
      </p>

      <h2 className="text-2xl font-bold text-foreground mb-4">{t('docs.creating-repertoire')}</h2>
      <p className="text-muted-foreground mb-6">
        {t('docs.creating-repertoire-desc')}
      </p>

      <h2 className="text-2xl font-bold text-foreground mb-4">{t('docs.opening-explorer')}</h2>
      <p className="text-muted-foreground mb-6">
        {t('docs.opening-explorer-desc')}
      </p>
    </DocsLayout>
  );
};

export default ManageRepertoire;
