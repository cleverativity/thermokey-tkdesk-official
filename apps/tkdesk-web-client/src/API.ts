/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateRealTimeCallbackInput = {
  id?: string | null,
  code: string,
  data: string,
  type: RealTimeCallbackType,
};

export enum RealTimeCallbackType {
  downloadUpdate = "downloadUpdate",
  downloadSelectionsPdfUpdate = "downloadSelectionsPdfUpdate",
  fanModelImportUpdate = "fanModelImportUpdate",
}


export type ModelRealTimeCallbackConditionInput = {
  code?: ModelStringInput | null,
  data?: ModelStringInput | null,
  type?: ModelRealTimeCallbackTypeInput | null,
  and?: Array< ModelRealTimeCallbackConditionInput | null > | null,
  or?: Array< ModelRealTimeCallbackConditionInput | null > | null,
  not?: ModelRealTimeCallbackConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelRealTimeCallbackTypeInput = {
  eq?: RealTimeCallbackType | null,
  ne?: RealTimeCallbackType | null,
};

export type RealTimeCallback = {
  __typename: "RealTimeCallback",
  id: string,
  code: string,
  data: string,
  type: RealTimeCallbackType,
  createdAt: string,
  updatedAt: string,
};

export type UpdateRealTimeCallbackInput = {
  id: string,
  code?: string | null,
  data?: string | null,
  type?: RealTimeCallbackType | null,
};

export type DeleteRealTimeCallbackInput = {
  id: string,
};

export type CreateMenuNotificationInput = {
  id?: string | null,
  count: number,
  createdAt?: string | null,
};

export type ModelMenuNotificationConditionInput = {
  count?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelMenuNotificationConditionInput | null > | null,
  or?: Array< ModelMenuNotificationConditionInput | null > | null,
  not?: ModelMenuNotificationConditionInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type MenuNotification = {
  __typename: "MenuNotification",
  id: string,
  count: number,
  createdAt?: string | null,
  updatedAt: string,
};

export type UpdateMenuNotificationInput = {
  id: string,
  count?: number | null,
  createdAt?: string | null,
};

export type DeleteMenuNotificationInput = {
  id: string,
};

export type ModelRealTimeCallbackFilterInput = {
  id?: ModelIDInput | null,
  code?: ModelStringInput | null,
  data?: ModelStringInput | null,
  type?: ModelRealTimeCallbackTypeInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelRealTimeCallbackFilterInput | null > | null,
  or?: Array< ModelRealTimeCallbackFilterInput | null > | null,
  not?: ModelRealTimeCallbackFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelRealTimeCallbackConnection = {
  __typename: "ModelRealTimeCallbackConnection",
  items:  Array<RealTimeCallback | null >,
  nextToken?: string | null,
};

export type ModelMenuNotificationFilterInput = {
  id?: ModelIDInput | null,
  count?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelMenuNotificationFilterInput | null > | null,
  or?: Array< ModelMenuNotificationFilterInput | null > | null,
  not?: ModelMenuNotificationFilterInput | null,
};

export type ModelMenuNotificationConnection = {
  __typename: "ModelMenuNotificationConnection",
  items:  Array<MenuNotification | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionRealTimeCallbackFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  code?: ModelSubscriptionStringInput | null,
  data?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionRealTimeCallbackFilterInput | null > | null,
  or?: Array< ModelSubscriptionRealTimeCallbackFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionMenuNotificationFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  count?: ModelSubscriptionIntInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionMenuNotificationFilterInput | null > | null,
  or?: Array< ModelSubscriptionMenuNotificationFilterInput | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type CreateRealTimeCallbackMutationVariables = {
  input: CreateRealTimeCallbackInput,
  condition?: ModelRealTimeCallbackConditionInput | null,
};

export type CreateRealTimeCallbackMutation = {
  createRealTimeCallback?:  {
    __typename: "RealTimeCallback",
    id: string,
    code: string,
    data: string,
    type: RealTimeCallbackType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateRealTimeCallbackMutationVariables = {
  input: UpdateRealTimeCallbackInput,
  condition?: ModelRealTimeCallbackConditionInput | null,
};

export type UpdateRealTimeCallbackMutation = {
  updateRealTimeCallback?:  {
    __typename: "RealTimeCallback",
    id: string,
    code: string,
    data: string,
    type: RealTimeCallbackType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteRealTimeCallbackMutationVariables = {
  input: DeleteRealTimeCallbackInput,
  condition?: ModelRealTimeCallbackConditionInput | null,
};

export type DeleteRealTimeCallbackMutation = {
  deleteRealTimeCallback?:  {
    __typename: "RealTimeCallback",
    id: string,
    code: string,
    data: string,
    type: RealTimeCallbackType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateMenuNotificationMutationVariables = {
  input: CreateMenuNotificationInput,
  condition?: ModelMenuNotificationConditionInput | null,
};

export type CreateMenuNotificationMutation = {
  createMenuNotification?:  {
    __typename: "MenuNotification",
    id: string,
    count: number,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateMenuNotificationMutationVariables = {
  input: UpdateMenuNotificationInput,
  condition?: ModelMenuNotificationConditionInput | null,
};

export type UpdateMenuNotificationMutation = {
  updateMenuNotification?:  {
    __typename: "MenuNotification",
    id: string,
    count: number,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteMenuNotificationMutationVariables = {
  input: DeleteMenuNotificationInput,
  condition?: ModelMenuNotificationConditionInput | null,
};

export type DeleteMenuNotificationMutation = {
  deleteMenuNotification?:  {
    __typename: "MenuNotification",
    id: string,
    count: number,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type GetRealTimeCallbackQueryVariables = {
  id: string,
};

export type GetRealTimeCallbackQuery = {
  getRealTimeCallback?:  {
    __typename: "RealTimeCallback",
    id: string,
    code: string,
    data: string,
    type: RealTimeCallbackType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListRealTimeCallbacksQueryVariables = {
  filter?: ModelRealTimeCallbackFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRealTimeCallbacksQuery = {
  listRealTimeCallbacks?:  {
    __typename: "ModelRealTimeCallbackConnection",
    items:  Array< {
      __typename: "RealTimeCallback",
      id: string,
      code: string,
      data: string,
      type: RealTimeCallbackType,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetMenuNotificationQueryVariables = {
  id: string,
};

export type GetMenuNotificationQuery = {
  getMenuNotification?:  {
    __typename: "MenuNotification",
    id: string,
    count: number,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type ListMenuNotificationsQueryVariables = {
  filter?: ModelMenuNotificationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMenuNotificationsQuery = {
  listMenuNotifications?:  {
    __typename: "ModelMenuNotificationConnection",
    items:  Array< {
      __typename: "MenuNotification",
      id: string,
      count: number,
      createdAt?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateRealTimeCallbackByCodeSubscriptionVariables = {
  code: string,
};

export type OnCreateRealTimeCallbackByCodeSubscription = {
  onCreateRealTimeCallbackByCode?:  {
    __typename: "RealTimeCallback",
    id: string,
    code: string,
    data: string,
    type: RealTimeCallbackType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateMenuNotificationByCodeSubscriptionVariables = {
  id: string,
};

export type OnUpdateMenuNotificationByCodeSubscription = {
  onUpdateMenuNotificationByCode?:  {
    __typename: "MenuNotification",
    id: string,
    count: number,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateRealTimeCallbackSubscriptionVariables = {
  filter?: ModelSubscriptionRealTimeCallbackFilterInput | null,
};

export type OnCreateRealTimeCallbackSubscription = {
  onCreateRealTimeCallback?:  {
    __typename: "RealTimeCallback",
    id: string,
    code: string,
    data: string,
    type: RealTimeCallbackType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateRealTimeCallbackSubscriptionVariables = {
  filter?: ModelSubscriptionRealTimeCallbackFilterInput | null,
};

export type OnUpdateRealTimeCallbackSubscription = {
  onUpdateRealTimeCallback?:  {
    __typename: "RealTimeCallback",
    id: string,
    code: string,
    data: string,
    type: RealTimeCallbackType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteRealTimeCallbackSubscriptionVariables = {
  filter?: ModelSubscriptionRealTimeCallbackFilterInput | null,
};

export type OnDeleteRealTimeCallbackSubscription = {
  onDeleteRealTimeCallback?:  {
    __typename: "RealTimeCallback",
    id: string,
    code: string,
    data: string,
    type: RealTimeCallbackType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateMenuNotificationSubscriptionVariables = {
  filter?: ModelSubscriptionMenuNotificationFilterInput | null,
};

export type OnCreateMenuNotificationSubscription = {
  onCreateMenuNotification?:  {
    __typename: "MenuNotification",
    id: string,
    count: number,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateMenuNotificationSubscriptionVariables = {
  filter?: ModelSubscriptionMenuNotificationFilterInput | null,
};

export type OnUpdateMenuNotificationSubscription = {
  onUpdateMenuNotification?:  {
    __typename: "MenuNotification",
    id: string,
    count: number,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteMenuNotificationSubscriptionVariables = {
  filter?: ModelSubscriptionMenuNotificationFilterInput | null,
};

export type OnDeleteMenuNotificationSubscription = {
  onDeleteMenuNotification?:  {
    __typename: "MenuNotification",
    id: string,
    count: number,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};
