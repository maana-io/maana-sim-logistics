const { paths, type } = input;

if (type) {
  return paths.filter((x) => x.type === type.id);
}
return paths;
