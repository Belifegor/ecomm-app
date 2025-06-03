import { Link, useLocation } from 'react-router-dom';

export function Breadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);

  const crumbs = [
    { label: 'Home', to: '/' },
    ...paths.map((segment, index) => {
      const path = '/' + paths.slice(0, index + 1).join('/');
      const label = segment.charAt(0).toUpperCase() + segment.slice(1);
      return { label, to: path };
    }),
  ];
  return (
    <nav className="text-xl text-gray-500 py-4 w-full overflow-x-auto whitespace-nowrap">
      <ul className="flex items-center space-x-5">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <li key={crumb.to}>
              {index > 0 && <span className="text-gray-400 mr-5">{'>'}</span>}
              {isLast ? (
                <span className="font-semibold text-black">{crumb.label}</span>
              ) : (
                <Link
                  to={crumb.to}
                  className="text-gray-500 hover:underline transition"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
