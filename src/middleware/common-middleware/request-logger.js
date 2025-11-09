import morgan from "morgan";

// Add custom token for GraphQL operation
morgan.token("operation", (req) => {
  const body = req.body || {};
  const name = body.operationName || "unknown";
  const query = body.query || "";
  const type = query.trim().startsWith("mutation") ? "mutation" : "query";
  return `${type}:${name}`;
});

// Example format: include operation name and timing
export const graphqlLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms :operation",
);
