import { createBrowserRouter, RouterProvider } from "react-router";

let router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
  },
]);

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
