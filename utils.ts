export function fswitch(expression: any) {
  const resolver = (value: any) => ({
    case: (caseExpression: any, factory: () => any) => resolver(value).case,
    default: () => value,
  });

  const handler = {
    case: function (caseExpression: any, factory: () => any) {
      if (expression === caseExpression) {
        const result = factory();
        if (result !== undefined) {
          return Object.assign({}, result, resolver(result));
        }
      }
      return handler;
    },
    default: (factory: () => any) => factory(),
  };

  return handler;
}
