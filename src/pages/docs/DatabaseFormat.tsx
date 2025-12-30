import DocsLayout from '@/components/DocsLayout';

const DatabaseFormat = () => {
  return (
    <DocsLayout 
      title="Database Format"
      prevPage={{ title: 'Configure Engines', path: '/docs/configure-engines' }}
    >
      <p className="text-muted-foreground mb-8">
        En Croissant uses a custom database format optimized for chess games.
      </p>

      <h2 className="text-2xl font-bold text-foreground mb-4">Supported Formats</h2>
      <ul className="space-y-3 text-muted-foreground mb-6">
        <li className="flex items-start gap-2">
          <span>•</span>
          <span><strong className="text-foreground">PGN</strong> - Standard chess notation format</span>
        </li>
        <li className="flex items-start gap-2">
          <span>•</span>
          <span><strong className="text-foreground">ECDB</strong> - En Croissant's native database format</span>
        </li>
      </ul>

      <h2 className="text-2xl font-bold text-foreground mb-4">Importing Games</h2>
      <p className="text-muted-foreground mb-6">
        You can import games from PGN files or directly from your Lichess and Chess.com accounts.
      </p>
    </DocsLayout>
  );
};

export default DatabaseFormat;
