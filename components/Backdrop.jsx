"use client";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";

export default function SimpleBackdrop({ visible }) {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={visible}
      >
        <h5>Loading...</h5>
      </Backdrop>
    </div>
  );
}
