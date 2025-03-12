import { type RouteConfig, index } from "@react-router/dev/routes";

import {
  type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes";

// export default [index("./App.tsx")] satisfies RouteConfig;
export default [
  index("./pages/Welcome/Welcome.tsx"),
  // route("", "./pages/Root/Root.tsx"),

  // layout("./auth/layout.tsx", [
  //   route("login", "./auth/login.tsx"),
  //   route("register", "./auth/register.tsx"),
  // ]),

  // ...prefix("concerts", [
  //   index("./concerts/home.tsx"),
  //   route(":city", "./concerts/city.tsx"),
  //   route("trending", "./concerts/trending.tsx"),
  // ]),
] satisfies RouteConfig;
