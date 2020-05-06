import React from "react";
import { connect } from "react-redux";
import {
  Route,
  Switch,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { IRootState } from "../state";
import EventList from "./EventList";
import SportPlaceholder from "./SportPlaceholder";
import SportList from "./SportList";
import EventDetails from "./EventDetails";
import Loader from "./Loader";
import AppBreadcrumbs from "./AppBreadcrumbs";

export class App extends React.Component<IRootState & RouteComponentProps> {
  public render(): JSX.Element {
    return (
      <Container
        maxWidth="xl"
        disableGutters={true}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              <AppBreadcrumbs
                location={this.props.location}
                sport={this.props.sport}
                event={this.props.event}
              />
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="stretch"
          style={{ flexGrow: 1 }}
        >
          <Grid item xs={3} style={{ height: "100%" }}>
            <SportList />
            <Divider />
          </Grid>
          <Grid
            item
            xs={9}
            style={{ height: "100%", borderLeft: "1px solid #e0e0e0" }}
          >
            <Switch>
              <Route exact path="/" component={SportPlaceholder} />
              <Route
                exact
                strict={false}
                path="/sports/:sport_id"
                component={EventList}
              />
              <Route
                exact
                strict={false}
                path="/sports/:sport_id/events/:event_id"
                component={EventDetails}
              />
            </Switch>
          </Grid>
        </Grid>
        <Loader
          isLoading={
            this.props.isSportsLoading ||
            this.props.isSportLoading ||
            this.props.isEventsLoading ||
            this.props.isEventLoading
          }
        />
      </Container>
    );
  }
}

export const mapStateToProps = (state: IRootState) => state;

export default withRouter(connect(mapStateToProps)(App));
