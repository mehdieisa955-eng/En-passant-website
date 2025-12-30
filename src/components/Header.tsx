import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import { SearchModal } from './SearchModal';
import logo from '@/assets/large-logo.webp';

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/docs') {
      return location.pathname.startsWith('/docs');
    }
    return location.pathname === path;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <img src={logo} alt="En Croissant" className="w-8 h-8 rounded" />
                <span className="font-semibold text-foreground">En Croissant</span>
              </Link>

              <button
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-md text-muted-foreground text-sm hover:bg-secondary/80 transition-colors"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
                <kbd className="ml-2 px-1.5 py-0.5 bg-background rounded text-xs">Ctrl K</kbd>
              </button>
            </div>

            <nav className="flex items-center gap-6">
              <Link
                to="/support"
                className={`nav-link ${isActive('/support') ? 'nav-link-active' : ''}`}
              >
                Support
              </Link>
              <Link
                to="/docs"
                className={`nav-link ${isActive('/docs') ? 'nav-link-active' : ''}`}
              >
                Documentation
              </Link>
              <Link
                to="/download"
                className={`nav-link ${isActive('/download') ? 'nav-link-active' : ''}`}
              >
                Download
              </Link>
              <button className="text-muted-foreground hover:text-foreground">
                •••
              </button>
            </nav>
          </div>
        </div>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Header;
