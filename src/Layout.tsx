import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/courses">Courses</Link>
            </li>
          </ul>
        </nav>
      </header>
      <h1 className="text-3xl font-bold">Civilian Defense Drills</h1>
      <Outlet />
    </>
  );
}
