import { RouteObject } from "react-router-dom";

const drillRoutes: RouteObject = {
  path: "drills",
  lazy: async () => {
    const { Layout } = await import("./");
    return { Component: Layout };
  },
  children: [
    {
      index: true,
      lazy: async () => {
        const { DrillsList } = await import("./");
        return { Component: DrillsList };
      },
    },
    {
      path: "new",
      lazy: async () => {
        const { FormPage } = await import("./");
        return { Component: FormPage };
      },
    },
    {
      path: ":id/edit",
      lazy: async () => {
        const { FormPage } = await import("./");
        return { Component: FormPage };
      },
    },
    {
      path: ":id",
      lazy: async () => {
        const { ViewDrill } = await import("./");
        return { Component: ViewDrill };
      },
    },
  ],
};

export default drillRoutes;
