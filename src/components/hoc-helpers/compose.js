// композиция вложенных HOC-функций
const compose = (...funcs) => component => {
  return funcs.reduceRight((prevRes, fn) => fn(prevRes), component);
};

export default compose;
