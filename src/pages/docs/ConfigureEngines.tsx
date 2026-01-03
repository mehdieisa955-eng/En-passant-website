import DocsLayout from '@/components/DocsLayout';
import { useLanguage } from '@/contexts/LanguageContext';

const ConfigureEngines = () => {
  const { t } = useLanguage();

  return (
    <DocsLayout 
      title={t('docs.configure-engines')}
      prevPage={{ title: t('docs.manage-repertoire'), path: '/docs/manage-repertoire' }}
      nextPage={{ title: t('docs.database-format'), path: '/docs/database-format' }}
    >
      <p className="text-muted-foreground mb-8">
        {t('docs.configure-intro')}
      </p>

      <h2 className="text-2xl font-bold text-foreground mb-4">{t('docs.installing-engines')}</h2>
      <p className="text-muted-foreground mb-6">
        {t('docs.installing-engines-desc')}
      </p>

      <h2 className="text-2xl font-bold text-foreground mb-4">{t('docs.engine-settings')}</h2>
      <ul className="space-y-3 text-muted-foreground mb-6">
        <li className="flex items-start gap-2">
          <span>•</span>
          <span>{t('docs.hash-size')}</span>
        </li>
        <li className="flex items-start gap-2">
          <span>•</span>
          <span>{t('docs.cpu-threads')}</span>
        </li>
        <li className="flex items-start gap-2">
          <span>•</span>
          <span>{t('docs.analysis-depth')}</span>
        </li>
        <li className="flex items-start gap-2">
          <span>•</span>
          <span>{t('docs.syzygy')}</span>
        </li>
      </ul>
    </DocsLayout>
  );
};

export default ConfigureEngines;
