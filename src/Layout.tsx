import { Separator } from "@radix-ui/themes";
import { Outlet } from "react-router-dom";
import { CounterClockwiseClockIcon, TargetIcon } from "@radix-ui/react-icons";
// import { Link as RadixLink } from "@radix-ui/themes";
import Link from "./components/Link";

export default function Layout() {
  return (
    <main className="min-h-screen max-h-screen flex flex-col p-2">
      <Link to="/" className="text-center m-1">
        Civilian Defense Drills
      </Link>
      <div className="flex-1 basis-0 flex flex-col overflow-y-auto">
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
            <li>
              <Link to="/drills" className="flex gap-1 items-center">
                <TargetIcon />
                Drills
              </Link>
            </li>
            <li>
              <Link to="/history" className="flex gap-1 items-center">
                <CounterClockwiseClockIcon />
                History
              </Link>
            </li>
          </ul>
        </nav>
        <div className="h-4" />
      </header>
    </main>
  );
}
