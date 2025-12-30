import { Link, useLocation } from 'react-router-dom';

const docsSidebar = [
  {
    title: 'Assets',
    items: [
      { title: 'Databases', path: '/docs/databases' },
      { title: 'Engines', path: '/docs/engines' },
    ],
  },
  {
    title: 'Guides',
    items: [
      { title: 'Analyze Game', path: '/docs/analyze-game' },
      { title: 'Manage Repertoire', path: '/docs/manage-repertoire' },
      { title: 'Configure Engines', path: '/docs/configure-engines' },
    ],
  },
  {
    title: 'Reference',
    items: [
      { title: 'Database Format', path: '/docs/database-format' },
    ],
  },
];

const DocsSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 flex-shrink-0">
      <nav className="sticky top-20 space-y-6">
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
