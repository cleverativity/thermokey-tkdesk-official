/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createRealTimeCallback = /* GraphQL */ `mutation CreateRealTimeCallback(
  $input: CreateRealTimeCallbackInput!
  $condition: ModelRealTimeCallbackConditionInput
) {
  createRealTimeCallback(input: $input, condition: $condition) {
    id
    code
    data
    type
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateRealTimeCallbackMutationVariables,
  APITypes.CreateRealTimeCallbackMutation
>;
export const updateRealTimeCallback = /* GraphQL */ `mutation UpdateRealTimeCallback(
  $input: UpdateRealTimeCallbackInput!
  $condition: ModelRealTimeCallbackConditionInput
) {
  updateRealTimeCallback(input: $input, condition: $condition) {
    id
    code
    data
    type
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateRealTimeCallbackMutationVariables,
  APITypes.UpdateRealTimeCallbackMutation
>;
export const deleteRealTimeCallback = /* GraphQL */ `mutation DeleteRealTimeCallback(
  $input: DeleteRealTimeCallbackInput!
  $condition: ModelRealTimeCallbackConditionInput
) {
  deleteRealTimeCallback(input: $input, condition: $condition) {
    id
    code
    data
    type
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteRealTimeCallbackMutationVariables,
  APITypes.DeleteRealTimeCallbackMutation
>;
export const createMenuNotification = /* GraphQL */ `mutation CreateMenuNotification(
  $input: CreateMenuNotificationInput!
  $condition: ModelMenuNotificationConditionInput
) {
  createMenuNotification(input: $input, condition: $condition) {
    id
    count
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateMenuNotificationMutationVariables,
  APITypes.CreateMenuNotificationMutation
>;
export const updateMenuNotification = /* GraphQL */ `mutation UpdateMenuNotification(
  $input: UpdateMenuNotificationInput!
  $condition: ModelMenuNotificationConditionInput
) {
  updateMenuNotification(input: $input, condition: $condition) {
    id
    count
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateMenuNotificationMutationVariables,
  APITypes.UpdateMenuNotificationMutation
>;
export const deleteMenuNotification = /* GraphQL */ `mutation DeleteMenuNotification(
  $input: DeleteMenuNotificationInput!
  $condition: ModelMenuNotificationConditionInput
) {
  deleteMenuNotification(input: $input, condition: $condition) {
    id
    count
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteMenuNotificationMutationVariables,
  APITypes.DeleteMenuNotificationMutation
>;
