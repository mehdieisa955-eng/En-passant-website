import DocsLayout from '@/components/DocsLayout';

const engines = [
  { name: "Stockfish", description: "The strongest open-source chess engine in the world." },
  { name: "Leela Chess Zero", description: "A neural network-based chess engine inspired by AlphaZero." },
  { name: "Komodo", description: "A powerful chess engine known for its positional play." },
];

const Engines = () => {
  return (
    <DocsLayout 
      title="Engines"
      prevPage={{ title: 'Databases', path: '/docs/databases' }}
      nextPage={{ title: 'Analyze Game', path: '/docs/analyze-game' }}
    >
      <p className="text-muted-foreground mb-8">
        En Croissant supports all UCI-compatible chess engines. Here are some popular options:
      </p>

      <div className="space-y-8">
        {engines.map((engine) => (
          <div key={engine.name}>
            <h3 className="text-xl font-bold text-foreground mb-2">{engine.name}</h3>
            <p className="text-muted-foreground mb-2">{engine.description}</p>
            <a href="#" className="doc-link">Download</a>
          </div>
        ))}
      </div>
    </DocsLayout>
  );
};

export default Engines;
