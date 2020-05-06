import React, { Dispatch } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import * as Actions from "../state/actions";
import * as Models from "../models";
import { IRootState } from "../state";

export interface ISportListProps extends RouteComponentProps<{}> {
  sports: Array<Models.SportModel>;
  sport: Models.SportModel | null;
  history: any;
  getSports: () => void;
}
export class SportList extends React.Component<ISportListProps> {
  public componentDidMount(): void {
    this.props.getSports();
  }

  public selectSport(id: number): void {
    this.props.history.push(`/sports/${id}`);
  }

  public render(): JSX.Element {
    const sports = this.props.sports.sort(
      (a: Models.SportModel, b: Models.SportModel) => a.pos - b.pos
    );
    const selection = this.props.sport ? this.props.sport.id : null;
    return (
      <List component="nav" disablePadding={true}>
        {sports.map((sport: Models.SportModel) => {
          return (
            <ListItem
              button
              style={{ overflow: "hidden" }}
              key={sport.id}
              selected={selection === sport.id}
              onClick={() => this.selectSport(sport.id)}
            >
              <ListItemText primary={sport.desc} />
            </ListItem>
          );
        })}
      </List>
    );
  }
}

export const mapStateToProps = (state: IRootState) => state;

export const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  getSports: () => {
    dispatch(new Actions.GetSportsAction().createAction());
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SportList)
);
