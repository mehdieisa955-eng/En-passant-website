import DocsLayout from '@/components/DocsLayout';
import { useLanguage } from '@/contexts/LanguageContext';

const DatabaseFormat = () => {
  const { t } = useLanguage();

  return (
    <DocsLayout 
      title={t('docs.database-format')}
      prevPage={{ title: t('docs.configure-engines'), path: '/docs/configure-engines' }}
    >
      <p className="text-muted-foreground mb-8">
        {t('docs.format-intro')}
      </p>

      <h2 className="text-2xl font-bold text-foreground mb-4">{t('docs.supported-formats')}</h2>
      <ul className="space-y-3 text-muted-foreground mb-6">
        <li className="flex items-start gap-2">
          <span>•</span>
          <span><strong className="text-foreground">PGN</strong> - {t('docs.pgn-desc')}</span>
        </li>
        <li className="flex items-start gap-2">
          <span>•</span>
          <span><strong className="text-foreground">ECDB</strong> - {t('docs.ecdb-desc')}</span>
        </li>
      </ul>

      <h2 className="text-2xl font-bold text-foreground mb-4">{t('docs.importing-games')}</h2>
      <p className="text-muted-foreground mb-6">
        {t('docs.import-games-desc')}
      </p>
    </DocsLayout>
  );
};

export default DatabaseFormat;
