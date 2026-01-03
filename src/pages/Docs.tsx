import DocsLayout from '@/components/DocsLayout';
import { useLanguage } from '@/contexts/LanguageContext';

const Docs = () => {
  const { t } = useLanguage();

  return (
    <DocsLayout 
      title={t('docs.what-is')}
      nextPage={{ title: t('docs.databases'), path: '/docs/databases' }}
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">{t('docs.features')}</h2>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>
              {t('docs.feature-1')}{' '}
              <a href="https://lichess.org" target="_blank" rel="noopener noreferrer" className="doc-link">
                lichess.org
              </a>{' '}
              {t('docs.and')}{' '}
              <a href="https://chess.com" target="_blank" rel="noopener noreferrer" className="doc-link">
                chess.com
              </a>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>{t('docs.feature-2')}</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>{t('docs.feature-3')}</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>{t('docs.feature-4')}</span>
          </li>
        </ul>
      </section>
    </DocsLayout>
  );
};

export default Docs;
