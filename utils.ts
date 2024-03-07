import React from "react";

interface Case {
  when?: any;
  factory: () => any;
}
export function fswitch(expression: any) {
  const recursion = {
    case: function (caseExpression: any, factory: () => any) {
      if (expression === caseExpression) {
        const result = factory();
        if (result !== undefined) {
          return Object.assign({}, factory(), {
            case: recursion.case,
            default: () => factory(),
          });
        }
      }
      return recursion;
    },
    default: (factory: () => any) => factory(),
  };
  return recursion;
}
