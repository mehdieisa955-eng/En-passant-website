import DocsLayout from '@/components/DocsLayout';
import { useLanguage } from '@/contexts/LanguageContext';

const Engines = () => {
  const { t } = useLanguage();

  const engines = [
    { name: "Stockfish", description: t('docs.stockfish-desc') },
    { name: "Leela Chess Zero", description: t('docs.lc0-desc') },
    { name: "Komodo", description: t('docs.komodo-desc') },
  ];

  return (
    <DocsLayout 
      title={t('docs.engines')}
      prevPage={{ title: t('docs.databases'), path: '/docs/databases' }}
      nextPage={{ title: t('docs.analyze-game'), path: '/docs/analyze-game' }}
    >
      <p className="text-muted-foreground mb-8">
        {t('docs.engines-desc')}
      </p>

      <div className="space-y-8">
        {engines.map((engine) => (
          <div key={engine.name}>
            <h3 className="text-xl font-bold text-foreground mb-2">{engine.name}</h3>
            <p className="text-muted-foreground mb-2">{engine.description}</p>
            <a href="#" className="doc-link">{t('docs.download')}</a>
          </div>
        ))}
      </div>
    </DocsLayout>
  );
};

export default Engines;
