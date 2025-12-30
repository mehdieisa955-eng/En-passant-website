import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import DocsSidebar from '@/components/DocsSidebar';

interface DocsLayoutProps {
  children: ReactNode;
  title: string;
  nextPage?: { title: string; path: string };
  prevPage?: { title: string; path: string };
}

const DocsLayout = ({ children, title, nextPage, prevPage }: DocsLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        <h1 className="text-4xl font-bold text-foreground text-center py-12 border-b border-border">
          {title}
        </h1>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-12">
            <DocsSidebar />
            
            <main className="flex-1 min-w-0">
              <div className="text-sm text-muted-foreground mb-8">
                On this page &gt;
              </div>
              
              <div className="prose prose-invert max-w-none">
                {children}
              </div>

              <div className="mt-16 pt-8 border-t border-border">
                <div className="flex justify-between">
                  {prevPage && (
                    <Link
                      to={prevPage.path}
                      className="feature-card text-left"
                    >
                      <span className="text-sm text-muted-foreground">Previous page</span>
                      <span className="block text-primary">{prevPage.title}</span>
                    </Link>
                  )}
                  {nextPage && (
                    <Link
                      to={nextPage.path}
                      className="feature-card text-right ml-auto"
                    >
                      <span className="text-sm text-muted-foreground">Next page</span>
                      <span className="block text-primary">{nextPage.title}</span>
                    </Link>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsLayout;
