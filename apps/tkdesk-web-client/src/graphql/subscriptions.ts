/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateRealTimeCallbackByCode = /* GraphQL */ `subscription OnCreateRealTimeCallbackByCode($code: String!) {
  onCreateRealTimeCallbackByCode(code: $code) {
    id
    code
    data
    type
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateRealTimeCallbackByCodeSubscriptionVariables,
  APITypes.OnCreateRealTimeCallbackByCodeSubscription
>;
export const onUpdateMenuNotificationByCode = /* GraphQL */ `subscription OnUpdateMenuNotificationByCode($id: String!) {
  onUpdateMenuNotificationByCode(id: $id) {
    id
    count
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateMenuNotificationByCodeSubscriptionVariables,
  APITypes.OnUpdateMenuNotificationByCodeSubscription
>;
export const onCreateRealTimeCallback = /* GraphQL */ `subscription OnCreateRealTimeCallback(
  $filter: ModelSubscriptionRealTimeCallbackFilterInput
) {
  onCreateRealTimeCallback(filter: $filter) {
    id
    code
    data
    type
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateRealTimeCallbackSubscriptionVariables,
  APITypes.OnCreateRealTimeCallbackSubscription
>;
export const onUpdateRealTimeCallback = /* GraphQL */ `subscription OnUpdateRealTimeCallback(
  $filter: ModelSubscriptionRealTimeCallbackFilterInput
) {
  onUpdateRealTimeCallback(filter: $filter) {
    id
    code
    data
    type
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateRealTimeCallbackSubscriptionVariables,
  APITypes.OnUpdateRealTimeCallbackSubscription
>;
export const onDeleteRealTimeCallback = /* GraphQL */ `subscription OnDeleteRealTimeCallback(
  $filter: ModelSubscriptionRealTimeCallbackFilterInput
) {
  onDeleteRealTimeCallback(filter: $filter) {
    id
    code
    data
    type
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteRealTimeCallbackSubscriptionVariables,
  APITypes.OnDeleteRealTimeCallbackSubscription
>;
export const onCreateMenuNotification = /* GraphQL */ `subscription OnCreateMenuNotification(
  $filter: ModelSubscriptionMenuNotificationFilterInput
) {
  onCreateMenuNotification(filter: $filter) {
    id
    count
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateMenuNotificationSubscriptionVariables,
  APITypes.OnCreateMenuNotificationSubscription
>;
export const onUpdateMenuNotification = /* GraphQL */ `subscription OnUpdateMenuNotification(
  $filter: ModelSubscriptionMenuNotificationFilterInput
) {
  onUpdateMenuNotification(filter: $filter) {
    id
    count
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateMenuNotificationSubscriptionVariables,
  APITypes.OnUpdateMenuNotificationSubscription
>;
export const onDeleteMenuNotification = /* GraphQL */ `subscription OnDeleteMenuNotification(
  $filter: ModelSubscriptionMenuNotificationFilterInput
) {
  onDeleteMenuNotification(filter: $filter) {
    id
    count
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteMenuNotificationSubscriptionVariables,
  APITypes.OnDeleteMenuNotificationSubscription
>;
