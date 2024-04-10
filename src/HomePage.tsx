import { TargetIcon, CounterClockwiseClockIcon } from "@radix-ui/react-icons";
import { Card } from "@radix-ui/themes";
import Link from "./components/Link";
import About from "./About";

export default function Home() {
  return (
    <>
      <section className="grid grid-cols-2 gap-3">
        <Card className="flex flex-col text-center items-center gap-2">
          <Link to="/drills">
            <TargetIcon height={100} width={100} />
            Drills
          </Link>
        </Card>
        <Card className="flex flex-col text-center items-center gap-2">
          <Link to="/history">
            <CounterClockwiseClockIcon height={100} width={100} />
            History
          </Link>
        </Card>
      </section>
      <About />
    </>
  );
}
