export const routes = [
  {
    name: "Result Generator",
    links: [
      {
        name: "Students",
        badge: null,
        url: "/generator",
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        name: "Objectives",
        badge: null,
        url: "/generator/objectives",
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        name: "Results",
        badge: null,
        url: "/generator/results",
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        name: "Template",
        badge: null,
        url: "/generator/template",
        roles: ["SUPER_ADMIN", "ADMIN", "USER"],
      },
    ],
  },

  {
    name: "User Management",
    links: [
      {
        name: "Users",
        badge: null,
        url: "/users",
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
    ],
  },
  {
    name: null,
    links: [
      {
        name: "Settings",
        badge: null,
        url: "/settings",
        roles: ["SUPER_ADMIN", "ADMIN", "USER"],
      },
    ],
  },
];
