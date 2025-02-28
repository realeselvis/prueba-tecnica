import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("users", "routes/users/users.tsx"),
  route("users/new", "routes/users/new.tsx"),
  route("edit-user/:userId", "routes/users/edit-user.tsx"),
] satisfies RouteConfig;
