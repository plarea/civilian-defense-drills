import { useNavigate } from "react-router-dom";
import { useQueryDrills } from "../service";
import { Button, Container, Flex, Heading, Text } from "@radix-ui/themes";

export default function DrillsList() {
  const drills = useQueryDrills();
  const navigate = useNavigate();
  const handleCreateDrill = () => {
    navigate("/drills/create");
  };
  return (
    <Flex gap="2" direction="column">
      <Heading>Drills</Heading>
      <Flex gap="3" direction="column">
        {!drills.length && <Text>No saved drills. Lets create one!</Text>}
        {drills.map((drill) => (
          <Container key={drill.id}>
            <Text>{drill.name}</Text>
          </Container>
        ))}
        <Button onClick={handleCreateDrill}>Create Drill</Button>
      </Flex>
    </Flex>
  );
}
