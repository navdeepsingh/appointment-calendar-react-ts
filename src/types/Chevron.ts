export interface IChevron {
  direction: "top" | "right" | "bottom" | "left";
  style?: { [style: string]: string };
  className?: string;
}
