import React, { useEffect, useMemo } from "react";
import useFetch from "../../hooks/useFetch";
import DisplayText from "./DisplayText";
import Loading from "../Loading";
import { Spacing } from "./type";

import "./Prism.css";

const Prism = () => {
  const [spacingData, setSpacingData] = React.useState<Spacing[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [focusItem, setFocusItem] = React.useState<string | undefined>();

  const [mt, ml, mr, mb] = useMemo(
    () => spacingData.filter((i) => i.type === "margin"),
    [spacingData]
  );
  const [pt, pl, pr, pb] = useMemo(
    () => spacingData.filter((i) => i.type === "padding"),
    [spacingData]
  );

  const {
    loading: isSpacingDataPending,
    error,
    data,
  } = useFetch<Spacing[]>(`http://localhost:12346/spacing`);

  useEffect(() => {
    setSpacingData(data || []);
  }, [data]);

  const submitHandler = async (data: Spacing) => {
    setLoading(true);
    const newData = spacingData.map((item) => {
      if (data.id === item.id) {
        return data;
      }
      return item;
    });

    // TODO: need to submit below data to api
    setTimeout(() => {
      setLoading(false);
      setSpacingData(newData);
      setFocusItem(undefined);
    }, 1000);
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
      {loading || isSpacingDataPending ? <Loading /> : null}
      {error ? <div>Error: Something went wrong while getting data</div> : null}
      <div className="Prism-row">
        <DisplayText
          {...mt}
          isFocused={mt?.id === focusItem}
          onClick={changeFocusItemHandler}
          onSubmit={submitHandler}
        />
        <div className="Prism-flex-vertical">
          <DisplayText
            {...ml}
            isFocused={ml?.id === focusItem}
            onClick={changeFocusItemHandler}
            onSubmit={submitHandler}
          />
          <div className="Prism-inner-box">
            <div className="Prism-row">
              <DisplayText
                {...pt}
                isFocused={pt?.id === focusItem}
                onClick={changeFocusItemHandler}
                onSubmit={submitHandler}
              />
              <div className="Prism-flex-vertical">
                <DisplayText
                  {...pl}
                  isFocused={pl?.id === focusItem}
                  onClick={changeFocusItemHandler}
                  onSubmit={submitHandler}
                />
                <DisplayText
                  {...pr}
                  isFocused={pr?.id === focusItem}
                  onClick={changeFocusItemHandler}
                  onSubmit={submitHandler}
                />
              </div>
              <DisplayText
                {...pb}
                isFocused={pb?.id === focusItem}
                onClick={changeFocusItemHandler}
                onSubmit={submitHandler}
              />
            </div>
          </div>
          <DisplayText
            {...mr}
            isFocused={mr?.id === focusItem}
            onClick={changeFocusItemHandler}
            onSubmit={submitHandler}
          />
        </div>
        <DisplayText
          {...mb}
          isFocused={mb?.id === focusItem}
          onClick={changeFocusItemHandler}
          onSubmit={submitHandler}
        />
      </div>
    </div>
  );
};

export default Prism;
