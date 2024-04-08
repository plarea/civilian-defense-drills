import { Separator } from "@radix-ui/themes";
import { Outlet } from "react-router-dom";
// import { ChevronLeftIcon } from "@radix-ui/react-icons";
// import { Link as RadixLink } from "@radix-ui/themes";
import Link from "./components/Link";

const links = [{ text: "Drills", to: "/drills" }];

export default function Layout() {
  return (
    <main className="min-h-dvh flex flex-col p-2">
      <div className="flex-auto flex flex-col">
        <Outlet />
      </div>
      <header className="flex-initial">
        <Separator my="2" size="4" />
        <nav>
          <ul className="flex justify-around">
          {
          // <li className="flex">
          //   <RadixLink className="flex items-center" onClick={() => {}}>
          //     <ChevronLeftIcon />
          //     Back
          //   </RadixLink>
          // </li>
          }
            {links.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.text}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </main>
  );
}
