import { RouteObject } from "react-router-dom";

const historyRoutes: RouteObject = {
  path: "history",
  children: [
    {
      index: true,
      lazy: async () => {
        const { HistoryList } = await import('./');
        return { Component: HistoryList };
      },
    },
  ],
};

export default historyRoutes;
