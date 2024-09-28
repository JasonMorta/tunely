/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/..\collection\getCollection` | `/..\collection\getEvents` | `/..\components\EventsList` | `/..\config\firebase` | `/..\types\Location` | `/_sitemap` | `/daily` | `/data/events` | `/profile` | `/venues`;
      DynamicRoutes: `/events/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/events/[id]`;
    }
  }
}
