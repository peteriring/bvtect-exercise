import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

export interface ILoaderProps {
  isLoading: boolean;
}
export class Loader extends React.Component<ILoaderProps> {
  public render(): JSX.Element {
    const { isLoading } = this.props;
    return (
      <Backdrop open={isLoading} style={{ zIndex: 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
}

export default Loader;
