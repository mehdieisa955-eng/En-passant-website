import DocsLayout from '@/components/DocsLayout';
import { useLanguage } from '@/contexts/LanguageContext';

const databases = [
  { name: "Lumbra's Gigabase", games: 9570564, players: 526520 },
  { name: "Caissabase 2024", games: 5404926, players: 321095 },
  { name: "Ajedrez Data - Correspondence", games: 1524027, players: 40547 },
  { name: "Ajedrez Data - OTB", games: 4279012, players: 144015 },
  { name: "MillionBase", games: 3451068, players: 284403 },
];

const Databases = () => {
  const { t } = useLanguage();

  return (
    <DocsLayout 
      title={t('docs.databases')}
      prevPage={{ title: t('docs.what-is'), path: '/docs' }}
      nextPage={{ title: t('docs.engines'), path: '/docs/engines' }}
    >
      <p className="text-muted-foreground mb-8">
        {t('docs.databases-desc')}
      </p>

      <div className="space-y-8">
        {databases.map((db) => (
          <div key={db.name}>
            <h3 className="text-xl font-bold text-foreground mb-2">{db.name}</h3>
            <p className="text-muted-foreground mb-2">
              <strong className="text-foreground">{t('docs.games')}:</strong> {db.games.toLocaleString()}{' '}
              <strong className="text-foreground ml-4">{t('docs.players')}:</strong> {db.players.toLocaleString()}
            </p>
            <a href="#" className="doc-link">{t('docs.download')}</a>
          </div>
        ))}
      </div>
    </DocsLayout>
  );
};

export default Databases;
