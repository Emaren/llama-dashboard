'use client';

import React from "react";

interface Props {
  queryType?: string; // made optional to prevent crash
}

const QueryTypeLabel: React.FC<Props> = ({ queryType = "" }) => {
  return (
    <span
      style={{
        padding: "5px 10px",
        borderRadius: "12px",
        backgroundColor: "#007bff",
        color: "#fff",
        fontWeight: "bold",
        fontSize: "0.9em",
      }}
    >
      {queryType.toUpperCase()}
    </span>
  );
};

export default QueryTypeLabel;
