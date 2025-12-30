import DocsLayout from '@/components/DocsLayout';

const databases = [
  { name: "Lumbra's Gigabase", games: 9570564, players: 526520 },
  { name: "Caissabase 2024", games: 5404926, players: 321095 },
  { name: "Ajedrez Data - Correspondence", games: 1524027, players: 40547 },
  { name: "Ajedrez Data - OTB", games: 4279012, players: 144015 },
  { name: "MillionBase", games: 3451068, players: 284403 },
];

const Databases = () => {
  return (
    <DocsLayout 
      title="Databases"
      prevPage={{ title: 'What is En Croissant?', path: '/docs' }}
      nextPage={{ title: 'Engines', path: '/docs/engines' }}
    >
      <p className="text-muted-foreground mb-8">
        En Croissant comes with a selection of databases to download with a single click. Here's a list of the databases currently available:
      </p>

      <div className="space-y-8">
        {databases.map((db) => (
          <div key={db.name}>
            <h3 className="text-xl font-bold text-foreground mb-2">{db.name}</h3>
            <p className="text-muted-foreground mb-2">
              <strong className="text-foreground">Games:</strong> {db.games.toLocaleString()}{' '}
              <strong className="text-foreground ml-4">Players:</strong> {db.players.toLocaleString()}
            </p>
            <a href="#" className="doc-link">Download</a>
          </div>
        ))}
      </div>
    </DocsLayout>
  );
};

export default Databases;
