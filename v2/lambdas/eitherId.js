const { left, right } = input;

if (!(left || right)) {
  throw new Error("Neither id is valid.");
}

return right || left;
