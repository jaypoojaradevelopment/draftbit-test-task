import React from "react";
import DisplayText from "./DisplayText";
import "./Prism.css";
import { Position, Spacing } from "./type";

type PrismProps = {
  spacingData: Spacing[];
};
const Prism = ({ spacingData = [] }: PrismProps) => {
  // TODO: need to get this below data from api
  spacingData = [
    {
      id: "1",
      position: Position.top,
      type: "margin",
    },
    {
      id: "2",
      position: Position.left,
      value: 24,
      unit: "px",
      type: "margin",
    },
    {
      id: "3",
      position: Position.right,
      value: 24,
      unit: "px",
      type: "margin",
    },
    {
      id: "4",
      position: Position.bottom,
      type: "margin",
    },

    {
      id: "5",
      position: Position.top,
      type: "padding",
    },
    {
      id: "6",
      position: Position.left,
      type: "padding",
    },
    {
      id: "7",
      position: Position.right,
      value: 24,
      unit: "px",
      type: "padding",
    },
    {
      id: "8",
      position: Position.bottom,
      type: "padding",
    },
  ];
  const [mt, ml, mr, mb] = spacingData.filter((i) => i.type === "margin");
  const [pt, pl, pr, pb] = spacingData.filter((i) => i.type === "padding");

  const [focusItem, setFocusItem] = React.useState<string | undefined>();

  const submitHandler = (data: Spacing) => {
    console.log("data", data);
  };

  const changeFocusItemHandler = (id?: string) => {
    const element = spacingData.find((i) => i.id === id);
    if (element) {
      setFocusItem(element.id);
    } else {
      setFocusItem(undefined);
    }
  };

  return (
    <div className="Prism">
      <div className="Prism-row">
        <DisplayText
          {...mt}
          isFocused={mt.id === focusItem}
          onClick={changeFocusItemHandler}
          onSubmit={submitHandler}
        />
        <div className="Prism-flex-vertical">
          <DisplayText
            {...ml}
            isFocused={ml.id === focusItem}
            onClick={changeFocusItemHandler}
            onSubmit={submitHandler}
          />
          <div className="Prism-inner-box">
            <div className="Prism-row">
              <DisplayText
                {...pt}
                isFocused={pt.id === focusItem}
                onClick={changeFocusItemHandler}
                onSubmit={submitHandler}
              />
              <div className="Prism-flex-vertical">
                <DisplayText
                  {...pl}
                  isFocused={pl.id === focusItem}
                  onClick={changeFocusItemHandler}
                  onSubmit={submitHandler}
                />
                <DisplayText
                  {...pr}
                  isFocused={pr.id === focusItem}
                  onClick={changeFocusItemHandler}
                  onSubmit={submitHandler}
                />
              </div>
              <DisplayText
                {...pb}
                isFocused={pb.id === focusItem}
                onClick={changeFocusItemHandler}
                onSubmit={submitHandler}
              />
            </div>
          </div>
          <DisplayText
            {...mr}
            isFocused={mr.id === focusItem}
            onClick={changeFocusItemHandler}
            onSubmit={submitHandler}
          />
        </div>
        <DisplayText
          {...mb}
          isFocused={mb.id === focusItem}
          onClick={changeFocusItemHandler}
          onSubmit={submitHandler}
        />
      </div>
    </div>
  );
};

export default Prism;
