import React from "react";

// MUI Stuff
import Typography from "@material-ui/core/Typography";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Chirag Khandhar | Akshay Kulkarni | Traveleasy&nbsp;
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
