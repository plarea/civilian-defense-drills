import { Route, createRoutesFromElements } from "react-router-dom";
import DrillsList from "./pages/List";

export const routes = createRoutesFromElements(
  <Route path="/" element={<DrillsList />}>
  </Route>
);

export function Component() {
  return <div>drill routes</div>;
}

