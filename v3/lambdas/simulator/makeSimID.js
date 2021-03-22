const { name, scenario, agentEndpoint } = input;

return `${name}:${scenario}:${agentEndpoint || "interactive"}`;
