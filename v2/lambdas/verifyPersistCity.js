const { city, id } = input;

if (!id) {
  throw new Error("Failed to persist city.");
}

return city;
