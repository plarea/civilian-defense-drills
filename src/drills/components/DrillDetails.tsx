import { Heading } from "@radix-ui/themes";
import Drill from "../models";

type Props = {
  drill: Drill;
};
export default function DrillDetails({ drill }: Props) {
  return (
    <section>
      <Heading>{drill.name}</Heading>
    </section>
  );
}
