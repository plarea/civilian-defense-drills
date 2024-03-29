import { Box, Container, Separator } from "@radix-ui/themes";
import { Outlet } from "react-router-dom";
import Link from "./components/Link";

const links = [
  { text: "Home", to: "/" },
  { text: "Drills", to: "/drills" },
  { text: "Courses", to: "/courses" },
];

export default function Layout() {
  return (
    <Box>
      <Container size="1">
        <header>
          <nav>
            <ul className="flex justify-around">
              {links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <Separator my="2" size="4" />
        <Box>
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
}
