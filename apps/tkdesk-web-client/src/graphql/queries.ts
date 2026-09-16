/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getRealTimeCallback = /* GraphQL */ `query GetRealTimeCallback($id: ID!) {
  getRealTimeCallback(id: $id) {
    id
    code
    data
    type
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetRealTimeCallbackQueryVariables,
  APITypes.GetRealTimeCallbackQuery
>;
export const listRealTimeCallbacks = /* GraphQL */ `query ListRealTimeCallbacks(
  $filter: ModelRealTimeCallbackFilterInput
  $limit: Int
  $nextToken: String
) {
  listRealTimeCallbacks(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      code
      data
      type
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListRealTimeCallbacksQueryVariables,
  APITypes.ListRealTimeCallbacksQuery
>;
export const getMenuNotification = /* GraphQL */ `query GetMenuNotification($id: ID!) {
  getMenuNotification(id: $id) {
    id
    count
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMenuNotificationQueryVariables,
  APITypes.GetMenuNotificationQuery
>;
export const listMenuNotifications = /* GraphQL */ `query ListMenuNotifications(
  $filter: ModelMenuNotificationFilterInput
  $limit: Int
  $nextToken: String
) {
  listMenuNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      count
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMenuNotificationsQueryVariables,
  APITypes.ListMenuNotificationsQuery
>;
