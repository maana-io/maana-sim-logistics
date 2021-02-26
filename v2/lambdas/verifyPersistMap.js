const { map, id } = input;

if (!id) {
  throw new Error("Failed to persist map.");
}

return map;
