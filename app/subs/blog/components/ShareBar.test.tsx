/** @jest-environment <rootDir>/jest.env-jsdom-nocanvas.cjs */
import { act, fireEvent, render, screen } from "@testing-library/react";
import ShareBar from "./ShareBar";

const URL_ = "https://blog.proofer.tech/%ED%95%9C%EA%B8%80";
const setNav = (v: object) =>
  Object.entries(v).forEach(([k, val]) =>
    Object.defineProperty(navigator, k, { value: val, configurable: true }),
  );

afterEach(() => {
  jest.useRealTimers();
  setNav({ share: undefined, clipboard: undefined });
});

test("복사 성공은 클립보드에 쓰고 2초 뒤 비운다, 거부되면 실패 문구", async () => {
  jest.useFakeTimers();
  const writeText = jest.fn().mockResolvedValue(undefined);
  setNav({ clipboard: { writeText } });
  render(<ShareBar url={URL_} title="제목" />);
  await act(async () => fireEvent.click(screen.getByLabelText("링크 복사")));
  expect(writeText).toHaveBeenCalledWith(URL_);
  expect(screen.getByRole("status").textContent).toBe("링크를 복사했습니다");
  act(() => jest.advanceTimersByTime(2000));
  expect(screen.getByRole("status").textContent).toBe("");

  writeText.mockRejectedValue(new Error("denied"));
  await act(async () => fireEvent.click(screen.getByLabelText("링크 복사")));
  expect(screen.getByRole("status").textContent).toMatch(/복사하지 못했습니다/);
});

test("intent 링크 href", () => {
  render(<ShareBar url={URL_} title="a b" />);
  const u = encodeURIComponent(URL_);
  const href = (n: string) => screen.getByLabelText(n).getAttribute("href");
  expect(href("X에 공유 (새 탭)")).toBe(
    `https://twitter.com/intent/tweet?url=${u}&text=a%20b`,
  );
  expect(href("Facebook에 공유 (새 탭)")).toBe(
    `https://www.facebook.com/sharer/sharer.php?u=${u}`,
  );
  expect(href("LinkedIn에 공유 (새 탭)")).toBe(
    `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
  );
});

test("navigator.share 없으면 공유하기 없음, 있으면 {title,url} 호출", () => {
  const { unmount } = render(<ShareBar url={URL_} title="제목" />);
  expect(screen.queryByLabelText("공유하기")).toBeNull();
  unmount();
  const share = jest.fn().mockResolvedValue(undefined);
  setNav({ share });
  render(<ShareBar url={URL_} title="제목" />);
  fireEvent.click(screen.getByLabelText("공유하기"));
  expect(share).toHaveBeenCalledWith({ title: "제목", url: URL_ });
});
