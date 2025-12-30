import DocsLayout from '@/components/DocsLayout';

const AnalyzeGame = () => {
  return (
    <DocsLayout 
      title="Analyze Game"
      prevPage={{ title: 'Engines', path: '/docs/engines' }}
      nextPage={{ title: 'Manage Repertoire', path: '/docs/manage-repertoire' }}
    >
      <p className="text-muted-foreground mb-8">
        Learn how to analyze your chess games with En Croissant.
      </p>

      <h2 className="text-2xl font-bold text-foreground mb-4">Getting Started</h2>
      <p className="text-muted-foreground mb-6">
        To analyze a game, first import it from your chess platform or load a PGN file. Then, select the game and click the "Analyze" button.
      </p>

      <h2 className="text-2xl font-bold text-foreground mb-4">Analysis Features</h2>
      <ul className="space-y-3 text-muted-foreground mb-6">
        <li className="flex items-start gap-2">
          <span>•</span>
          <span>Evaluation graph showing the game's flow</span>
        </li>
        <li className="flex items-start gap-2">
          <span>•</span>
          <span>Best move suggestions at each position</span>
        </li>
        <li className="flex items-start gap-2">
          <span>•</span>
          <span>Blunder, mistake, and inaccuracy detection</span>
        </li>
        <li className="flex items-start gap-2">
          <span>•</span>
          <span>Heatmap visualization of piece activity</span>
        </li>
      </ul>
    </DocsLayout>
  );
};

export default AnalyzeGame;
