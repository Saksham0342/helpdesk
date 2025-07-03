import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkStyle =
    "block px-3 py-2 rounded-lg font-medium text-gray-700 hover:bg-blue-100";
  const activeStyle =
    "block px-3 py-2 rounded-lg font-semibold bg-blue-600 text-white";

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-8">Helpdesk</h2>
        <nav className="space-y-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? activeStyle : linkStyle)}
          >
            🏠 Dashboard
          </NavLink>
          <NavLink
            to="/tickets"
            className={({ isActive }) => (isActive ? activeStyle : linkStyle)}
          >
            🎫 My Tickets
          </NavLink>
          <NavLink
            to="/new-ticket"
            className={({ isActive }) => (isActive ? activeStyle : linkStyle)}
          >
            ➕ New Ticket
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
