// 네이티브 canvas 가 빌드되지 않은 곳에서도 jsdom 환경이 뜨게 한다. jsdom 은 canvas 가 resolve 되면 require 하는데 .node 가 없으면 죽는다.
const Module = require("module");
const load = Module._load;
Module._load = function (request, ...rest) {
  if (request === "canvas") return {};
  return load.call(this, request, ...rest);
};
module.exports = require("jest-environment-jsdom");
