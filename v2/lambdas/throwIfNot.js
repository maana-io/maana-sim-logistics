const { condition, msg, pass } = input;

if (!condition) {
  throw new Error(msg);
}

return pass;
