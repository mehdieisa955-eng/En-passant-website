import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const DocsSidebar = () => {
  const location = useLocation();
  const { t, language } = useLanguage();

  const docsSidebar = [
    {
      title: t('docs.assets'),
      items: [
        { title: t('docs.databases'), path: '/docs/databases' },
        { title: t('docs.engines'), path: '/docs/engines' },
      ],
    },
    {
      title: t('docs.guides'),
      items: [
        { title: t('docs.analyze-game'), path: '/docs/analyze-game' },
        { title: t('docs.manage-repertoire'), path: '/docs/manage-repertoire' },
        { title: t('docs.configure-engines'), path: '/docs/configure-engines' },
      ],
    },
    {
      title: t('docs.reference'),
      items: [
        { title: t('docs.database-format'), path: '/docs/database-format' },
      ],
    },
  ];

  return (
    <aside className="w-64 flex-shrink-0">
      <nav className={`sticky top-20 space-y-6 ${language === 'fa' ? 'text-right' : ''}`}>
        {docsSidebar.map((section) => (
          <div key={section.title}>
            <h3 className="text-foreground font-semibold mb-2">{section.title}</h3>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`sidebar-link block ${
                      location.pathname === item.path ? 'sidebar-link-active' : ''
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default DocsSidebar;
