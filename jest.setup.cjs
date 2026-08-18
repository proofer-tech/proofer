// testEnvironment: "node" 로 도는 테스트(DOM 이 필요 없는 순수 로직)에는 window 가 없다.
// ponytail: 이 파일은 jsdom 전용이라 node 환경에서만 건너뛴다 - DOM API 확장이 늘면 재검토.
if (typeof window !== 'undefined') {
  require('@testing-library/jest-dom');

  const { getComputedStyle } = window;
  window.getComputedStyle = (elt) => getComputedStyle(elt);

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  window.ResizeObserver = ResizeObserver;
}
