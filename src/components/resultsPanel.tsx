import React from "react";

interface Props {
  children: React.ReactNode
}

export const ResultsPanel = (props: Props) => {

  return (
    <div className="resultsPanel">
      {props.children}
    </div>
  )
};