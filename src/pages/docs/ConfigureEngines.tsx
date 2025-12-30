import DocsLayout from '@/components/DocsLayout';

const ConfigureEngines = () => {
  return (
    <DocsLayout 
      title="Configure Engines"
      prevPage={{ title: 'Manage Repertoire', path: '/docs/manage-repertoire' }}
      nextPage={{ title: 'Database Format', path: '/docs/database-format' }}
    >
      <p className="text-muted-foreground mb-8">
        Learn how to install and configure chess engines in En Croissant.
      </p>

      <h2 className="text-2xl font-bold text-foreground mb-4">Installing Engines</h2>
      <p className="text-muted-foreground mb-6">
        Use the built-in download manager to install popular engines like Stockfish. You can also manually add any UCI-compatible engine.
      </p>

      <h2 className="text-2xl font-bold text-foreground mb-4">Engine Settings</h2>
      <ul className="space-y-3 text-muted-foreground mb-6">
        <li className="flex items-start gap-2">
          <span>•</span>
          <span>Configure hash table size</span>
        </li>
        <li className="flex items-start gap-2">
          <span>•</span>
          <span>Set number of CPU threads</span>
        </li>
        <li className="flex items-start gap-2">
          <span>•</span>
          <span>Adjust analysis depth and time limits</span>
        </li>
        <li className="flex items-start gap-2">
          <span>•</span>
          <span>Enable Syzygy tablebases</span>
        </li>
      </ul>
    </DocsLayout>
  );
};

export default ConfigureEngines;
