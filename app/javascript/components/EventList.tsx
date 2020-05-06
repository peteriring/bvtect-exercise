import React, { Dispatch } from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Box } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { IRootState } from "../state";
import * as Actions from "../state/actions";
import * as Models from "../models";

export interface IEventListProps
  extends RouteComponentProps<{ sport_id: string }> {
  sport: Models.SportModel | null;
  events: Array<Models.EventModel> | null;
  isSportLoading: boolean;
  getSport: (sportId: number) => void;
  getEvents: (sportId: number) => void;
}
export class EventList extends React.Component<IEventListProps> {
  private static slugify(name: string = ""): string {
    return name.replace(/\s/g, "_").toLowerCase();
  }

  public componentDidMount(): void {
    this.stateUpdateHook();
  }

  public componentDidUpdate(): void {
    this.stateUpdateHook();
  }

  public render(): JSX.Element {
    const sport = this.props.sport || Models.SportModel.Empty;
    const events = this.props.events || [];

    return (
      <Box
        display="flex"
        width="100%"
        height="100%"
        alignItems="center"
        flexDirection="column"
      >
        {events.map((event: Models.EventModel, index: number) => (
          <div key={event.id} style={{ margin: "10px" }}>
            <Card>
              <CardActionArea onClick={() => this.onClick(event)}>
                <CardMedia
                  component="img"
                  alt={sport.desc}
                  height="140"
                  image={`https://loremflickr.com/320/240/${EventList.slugify(
                    sport.desc
                  )}?random=${index}`}
                  title={sport.desc}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {event.desc}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => this.onClick(event)}
                >
                  Read More
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </Box>
    );
  }

  public onClick(event: Models.EventModel): void {
    const sport = this.props.sport;
    if (!sport) return this.props.history.push("/");
    this.props.history.push(`/sports/${sport.id}/events/${event.id}`);
  }

  private stateUpdateHook(): void {
    const sportId = parseInt(this.props.match.params.sport_id);
    if (
      (!this.props.sport && !this.props.isSportLoading) ||
      (this.props.sport && this.props.sport.id !== sportId)
    ) {
      this.props.getSport(sportId);
      this.props.getEvents(sportId);
    }
  }
}

export const mapStateToProps = (state: IRootState) => state;

export const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  getSport: (sportId: number) => {
    dispatch(new Actions.GetSportAction(sportId).createAction());
  },
  getEvents: (sportId: number) => {
    dispatch(new Actions.GetEventsAction(sportId).createAction());
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EventList)
);
