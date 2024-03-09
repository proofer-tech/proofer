export function fswitch(expression: any) {
  const resolute = (value: any) => ({
    case: (caseExpression: any, factory: () => any) => resolute(value).case,
    default: () => value,
  });
  const recursion = {
    case: function (caseExpression: any, factory: () => any) {
      if (expression === caseExpression) {
        const result = factory();
        if (result !== undefined) {
          return Object.assign({}, result, resolute(result));
        }
      }
      return recursion;
    },
    default: (factory: () => any) => factory(),
  };
  return recursion;
}
