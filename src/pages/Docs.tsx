import DocsLayout from '@/components/DocsLayout';

const Docs = () => {
  return (
    <DocsLayout 
      title="What is En Croissant?"
      nextPage={{ title: 'Databases', path: '/docs/databases' }}
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Features</h2>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>
              Store and analyze your games from{' '}
              <a href="https://lichess.org" target="_blank" rel="noopener noreferrer" className="doc-link">
                lichess.org
              </a>{' '}
              and{' '}
              <a href="https://chess.com" target="_blank" rel="noopener noreferrer" className="doc-link">
                chess.com
              </a>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Multi-engine analysis. Supports all UCI engines</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Prepare a repertoire with the opening explorer</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Simple engine and database installation and management</span>
          </li>
        </ul>
      </section>
    </DocsLayout>
  );
};

export default Docs;
