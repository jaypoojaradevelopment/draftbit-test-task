import clsx from "clsx";
import React, { FormEventHandler } from "react";
import { Spacing } from "../type";
import { useClickOutside } from "../../../hooks/useClickOutside";

type DisplayProps = {
  isFocused?: boolean;
  onClick: (id?: string) => void;
  onSubmit: (data: Spacing) => void;
} & Spacing;

const DisplayText = ({
  isFocused,
  onClick,
  onSubmit,
  ...data
}: DisplayProps) => {
  const { id, value, unit, position, type } = data;
  const isDefault = !value && !isFocused;
  const isChanged = value && unit && !isFocused;
  const classes = [
    "Prism-display-text",
    {
      "Prism-display-text__default": isDefault,
    },
    {
      "Prism-display-text__changed": isChanged,
    },
    {
      "Prism-display-text__focused": isFocused,
    },
  ];

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [currentValue, setCurrentValue] = React.useState<number>(0);

  const clickEventHandler = React.useCallback(() => {
    if (isDefault || isChanged) {
      onClick(id);
    }
  }, [isDefault, isChanged, onClick, id]);
  const submitHandler: FormEventHandler<HTMLFormElement> = React.useCallback(
    (event) => {
      event.preventDefault();
      onSubmit({
        id,
        position,
        type,
        unit: currentValue ? "pt" : undefined,
        value: currentValue ?? undefined,
      });
    },
    [onSubmit, id, position, type, currentValue]
  );

  // Attach the click outside listener to the modal
  useClickOutside(wrapperRef, () => onClick(undefined));

  // to check we are getting data else we should not display
  if (!id) {
    return null;
  }

  return (
    <div
      className={clsx(classes)}
      {...(!isFocused ? { onClick: clickEventHandler } : {})}
      ref={wrapperRef}
    >
      {isDefault ? <p>auto</p> : null}
      {isChanged ? <p>{`${value}${unit}`}</p> : null}
      {isFocused ? (
        <form className="Prism-form" onSubmit={submitHandler}>
          <label htmlFor="display-text-input" hidden>
            Margin & padding text
          </label>
          <input
            name="display-text-input"
            type="number"
            placeholder="10"
            min={0}
            autoFocus
            onChange={(e) => {
              setCurrentValue(Number(e.target.value));
            }}
            value={currentValue}
          />
        </form>
      ) : null}
    </div>
  );
};

export default DisplayText;
