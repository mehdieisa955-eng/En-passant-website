import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, LogOut } from 'lucide-react';
import { SearchModal } from './SearchModal';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './ui/button';
import logo from '@/assets/large-logo.webp';

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();
  const { user, userData, logout } = useAuth();

  const isActive = (path: string) => {
    if (path === '/docs') {
      return location.pathname.startsWith('/docs');
    }
    return location.pathname === path;
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <img src={logo} alt="En Croissant" className="w-8 h-8 rounded" />
                <span className="font-semibold text-foreground">{t('hero.title')}</span>
              </Link>

              <button
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-md text-muted-foreground text-sm hover:bg-secondary/80 transition-colors"
              >
                <Search className="w-4 h-4" />
                <span>{t('search')}</span>
                <kbd className="ms-2 px-1.5 py-0.5 bg-background rounded text-xs">Ctrl K</kbd>
              </button>
            </div>

            <nav className="flex items-center gap-4">
              <Link
                to="/support"
                className={`nav-link hidden sm:block ${isActive('/support') ? 'nav-link-active' : ''}`}
              >
                {t('nav.support')}
              </Link>
              <Link
                to="/docs"
                className={`nav-link hidden sm:block ${isActive('/docs') ? 'nav-link-active' : ''}`}
              >
                {t('nav.docs')}
              </Link>
              <Link
                to="/issues"
                className={`nav-link hidden sm:block ${isActive('/issues') ? 'nav-link-active' : ''}`}
              >
                {t('nav.issues')}
              </Link>
              <Link
                to="/download"
                className={`nav-link hidden sm:block ${isActive('/download') ? 'nav-link-active' : ''}`}
              >
                {t('nav.download')}
              </Link>
              
              {userData?.isAdmin && (
                <Link
                  to="/admin"
                  className={`nav-link hidden sm:block ${isActive('/admin') ? 'nav-link-active' : ''}`}
                >
                  {t('nav.admin')}
                </Link>
              )}

              <LanguageSwitcher />

              {user ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground hidden md:block">
                    {userData?.displayName || user.email}
                  </span>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Link to="/auth">
                  <Button variant="outline" size="sm">
                    {t('nav.login')}
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Header;
