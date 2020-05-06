import React from "react";
import { Box } from "@material-ui/core";

export class SportPlaceholder extends React.Component<any> {
  render() {
    return (
      <Box display="flex" width="100%" height="100%">
        <Box
          m="auto"
          fontStyle="italic"
          style={{ color: "#e0e0e0", fontFamily: "sans-serif" }}
        >
          Please select a sport to list the associated events.
        </Box>
      </Box>
    );
  }
}

export default SportPlaceholder;
