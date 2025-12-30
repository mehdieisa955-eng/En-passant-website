import DocsLayout from '@/components/DocsLayout';

const ManageRepertoire = () => {
  return (
    <DocsLayout 
      title="Manage Repertoire"
      prevPage={{ title: 'Analyze Game', path: '/docs/analyze-game' }}
      nextPage={{ title: 'Configure Engines', path: '/docs/configure-engines' }}
    >
      <p className="text-muted-foreground mb-8">
        Build and manage your opening repertoire with En Croissant's built-in tools.
      </p>

      <h2 className="text-2xl font-bold text-foreground mb-4">Creating a Repertoire</h2>
      <p className="text-muted-foreground mb-6">
        Go to the Repertoire tab and create a new repertoire. You can start from scratch or import from existing games.
      </p>

      <h2 className="text-2xl font-bold text-foreground mb-4">Opening Explorer</h2>
      <p className="text-muted-foreground mb-6">
        Use the opening explorer to see how moves are played at the master level. This helps you make informed decisions when building your repertoire.
      </p>
    </DocsLayout>
  );
};

export default ManageRepertoire;
