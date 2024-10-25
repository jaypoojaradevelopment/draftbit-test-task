export enum Position {
  top = "top",
  bottom = "bottom",
  left = "left",
  right = "right",
}

export type SpacingType = "margin" | "padding";

export type Spacing = {
  position: Position;
  value?: number;
  unit?: string;
  id: string;
  type: SpacingType;
};
