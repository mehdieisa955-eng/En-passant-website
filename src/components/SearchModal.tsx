import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export const SearchModal = ({ open, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (open) {
          onClose();
        } else {
          // This will be handled by parent
        }
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-card border border-primary rounded-lg shadow-2xl">
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <Search className="w-5 h-5 text-primary" />
          <input
            type="text"
            placeholder="Search docs"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-lg"
            autoFocus
          />
        </div>
        <div className="p-8 text-center text-muted-foreground">
          No recent searches
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-border text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span><kbd className="px-1.5 py-0.5 bg-secondary rounded text-xs">↵</kbd> to select</span>
            <span><kbd className="px-1.5 py-0.5 bg-secondary rounded text-xs">↓</kbd> <kbd className="px-1.5 py-0.5 bg-secondary rounded text-xs">↑</kbd> to navigate</span>
            <span><kbd className="px-1.5 py-0.5 bg-secondary rounded text-xs">esc</kbd> to close</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Search by</span>
            <span className="text-primary font-medium">algolia</span>
          </div>
        </div>
      </div>
    </div>
  );
};
