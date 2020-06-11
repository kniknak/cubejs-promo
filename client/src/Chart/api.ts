import cubejs from "@cubejs-client/core";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

export const cubejsApi = cubejs(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTE4MTg5NTcsImV4cCI6MTU5MTkwNTM1N30.rrUcgkgHm7ICzMY37j-rSeEvZTJtmlKc6xTq1uFA7lw",
    { apiUrl: API_URL + "/cubejs-api/v1" },
);
