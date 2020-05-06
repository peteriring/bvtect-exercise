import React from "react";
import * as Models from "../models";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

export interface IAppBreadcrumbsProps {
  location: any;
  sport: Models.SportModel | null;
  event: Models.EventModel | null;
}
export class AppBreadcrumbs extends React.Component<IAppBreadcrumbsProps> {
  public render(): JSX.Element {
    const breadcrumbs = this.getBreadcrumbs(this.props.location.pathname);
    return (
      <Breadcrumbs aria-label="breadcrumb" style={{ color: "white" }}>
        {breadcrumbs.map(
          (
            breadcrumb: { link: string; title: string },
            index: number,
            array: Array<{ link: string; title: string }>
          ) => {
            if (index + 1 === array.length) {
              return (
                <Typography key={index} color="inherit">
                  {breadcrumb.title}
                </Typography>
              );
            }
            return (
              <Link key={index} color="inherit" href={breadcrumb.link}>
                {breadcrumb.title}
              </Link>
            );
          }
        )}
      </Breadcrumbs>
    );
  }

  private getBreadcrumbs(path: string): Array<{ link: string; title: string }> {
    const array = [{ link: "/", title: "Dashboard" }];
    const sportMatch = path.match(/\/sports\/([^/]+)/);
    const eventMatch = path.match(/\/sports\/([^/]+)\/events\/([^/]+)/);
    if (sportMatch) {
      array.push({
        link: `/sports/${sportMatch[1]}`,
        title: this.props.sport ? this.props.sport.desc : "Sport",
      });
    }
    if (eventMatch) {
      array.push({
        link: `/sports/${eventMatch[1]}/events/${eventMatch[2]}`,
        title: this.props.event ? this.props.event.desc : "Event",
      });
    }
    return array;
  }
}

export default AppBreadcrumbs;
