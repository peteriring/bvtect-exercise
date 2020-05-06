import React, { Dispatch } from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { IRootState } from "../state";
import * as Actions from "../state/actions";
import * as Models from "../models";

export interface IEventDetailsProps
  extends RouteComponentProps<{ sport_id: string; event_id: string }> {
  event: Models.EventModel | null;
  isEventLoading: boolean;
  getEvent: (sportId: number, eventId: number) => void;
}
export class EventDetails extends React.Component<IEventDetailsProps> {
  public componentDidMount(): void {
    this.stateUpdateHook();
  }

  public componentDidUpdate(): void {
    this.stateUpdateHook();
  }

  public render(): JSX.Element {
    const event = this.props.event || Models.EventModel.Empty;
    return (
      <div style={{ margin: 10, display: "flex", justifyContent: "center" }}>
        <Card style={{ margin: 10 }}>
          <CardContent>
            {(() => {
              if (event.scoreboard.scoreB === event.scoreboard.scoreA)
                return (
                  <Typography color="textSecondary" gutterBottom>
                    Tie ({event.scoreboard.scoreA})
                  </Typography>
                );
              return (
                <Typography color="textSecondary" gutterBottom>
                  {event.scoreboard.scoreA > event.scoreboard.scoreB
                    ? "Winner"
                    : "Loser"}{" "}
                  ({event.scoreboard.scoreA})
                </Typography>
              );
            })()}
            <Typography
              variant="h5"
              component="h2"
              style={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {event.opponentADescription}
            </Typography>
            <Typography variant="body2" component="p">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </CardContent>
        </Card>
        <Card style={{ margin: 10 }}>
          <CardContent>
            {(() => {
              if (event.scoreboard.scoreB === event.scoreboard.scoreA)
                return (
                  <Typography color="textSecondary" gutterBottom>
                    Tie ({event.scoreboard.scoreB})
                  </Typography>
                );
              return (
                <Typography color="textSecondary" gutterBottom>
                  {event.scoreboard.scoreB > event.scoreboard.scoreA
                    ? "Winner"
                    : "Loser"}{" "}
                  ({event.scoreboard.scoreB})
                </Typography>
              );
            })()}
            <Typography
              variant="h5"
              component="h2"
              style={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {event.opponentBDescription}
            </Typography>
            <Typography variant="body2" component="p">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }

  private stateUpdateHook(): void {
    const sportId = parseInt(this.props.match.params.sport_id);
    const eventId = parseInt(this.props.match.params.event_id);
    if (
      (!this.props.event && !this.props.isEventLoading) ||
      (this.props.event && this.props.event.id !== eventId)
    ) {
      this.props.getEvent(sportId, eventId);
    }
  }
}

export const mapStateToProps = (state: IRootState) => state;

export const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  getEvent: (sportId: number, eventId: number) => {
    dispatch(
      new Actions.GetEventAction(
        new Actions.GetEventActionPayload(sportId, eventId)
      ).createAction()
    );
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EventDetails)
);
