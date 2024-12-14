import { merge } from "lodash";

export default function ChildCircle({
  size,
  color,
  rotateIndex,
}: {
  size: number;
  color: string;
  rotateIndex: number;
}) {
  const childCircleSize = size / 8;
  const childCircleOffset = (size - childCircleSize) / 2;
  const childTranslateDistance = size / 2 - childCircleSize / 2;
  const childCircleStyle = {
    position: "absolute",
    width: `${size / 8}px`,
    height: `${size / 8}px`,
    borderRadius: "50%",
    backgroundColor: color,
    top: `${childCircleOffset}px`,
    left: `${childCircleOffset}px`,
  } as any;
  return (
    <div
      style={merge(childCircleStyle, {
        transform: `rotate(${rotateIndex * 30}deg) translate(${childTranslateDistance}px)`,
      })}
    />
  );
}
