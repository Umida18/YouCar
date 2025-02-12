import { ChevronRight } from "lucide-react";
import { useLocation } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

export default function Breadcrumb({ items = [] }: BreadcrumbProps) {
  const location = useLocation();

  const breadcrumbItems =
    items.length > 0
      ? items
      : location.pathname
          .split("/")
          .filter(Boolean)
          .map((path, index, array) => {
            const url = `/${array.slice(0, index + 1).join("/")}`;
            return {
              label: path.charAt(0).toUpperCase() + path.slice(1),
              path: url,
            };
          });

  const allItems = [{ label: "Главная", path: "/" }, ...breadcrumbItems];

  return (
    <nav className="flex items-center space-x-1.5 py-3 my-5 text-sm bg-transparent rounded-md">
      {allItems.map((item, index) => (
        <div key={item.path} className="flex items-center">
          {index > 0 && (
            <ChevronRight className="h-4 w-4 mx-1.5 text-gray-400" />
          )}
          {index === allItems.length - 1 ? (
            <span className="text-gray-900">{item.label}</span>
          ) : (
            <a
              href={item.path}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              {item.label}
            </a>
          )}
        </div>
      ))}
    </nav>
  );
}
