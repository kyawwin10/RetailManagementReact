import { sidebarData } from "@/components/sidebar/sidebarData.ts";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";

const DesktopSidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const checkLocation = (paths: string[]): string => {
    return paths.includes(location.pathname)
      ? "bg-primary text-white shadow-lg"
      : "text-gray-700 hover:bg-gray-200 transition-colors";
  };

  return (
    <aside className="lg:flex flex-col hidden min-h-screen min-w-[240px] bg-gray-50 shadow-md border-r border-gray-200">
      {/* Sidebar Header */}
      <div className="flex flex-col items-center justify-center h-20 bg-primary text-white rounded-b-lg shadow">
        <h5 className="text-xl font-bold leading-4 cursor-pointer">
          {t("common.dashboard")} <span className="text-[10px] opacity-75">v.01</span>
        </h5>
        <h4 className="text-xs font-semibold tracking-wider">
          <span className="text-gray-400">Retail</span> Management
        </h4>
      </div>

      {/* Sidebar Links */}
      <ul className="px-3 py-4">
        {sidebarData.map((item) => (
          <NavLink to={item.routeNames[0]} key={item.name} className="block">
            <li
              className={
                "flex items-center gap-3 p-3 rounded-lg transition-all " + checkLocation(item.routeNames)
              }
            >
              {item.icon && <item.icon className="w-5 h-5 text-gray-600" />}
              <p className="text-sm font-medium">{t(item.name)}</p>
            </li>
          </NavLink>
        ))}
      </ul>
    </aside>
  );
};

export default DesktopSidebar;
