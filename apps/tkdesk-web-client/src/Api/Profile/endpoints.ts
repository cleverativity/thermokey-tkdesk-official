import * as queries from 'graphql/queries'
import * as subscriptions from 'graphql/subscriptions'

import * as API from 'aws-amplify/api'
import { GraphQLQuery } from 'aws-amplify/api'
import { ListMenuNotificationsQuery } from 'API'

const client = API.generateClient()

// MENU NOTIFICATIONS
export const getMenuNotifications = () => {
  return client.graphql<GraphQLQuery<ListMenuNotificationsQuery>>({
    query: queries.getMenuNotification,
    variables: {
      id: '5e11f175-794c-46cf-9f72-fc9fc0f280d',
    },
  })
}

// SUBSCRIPTION
export const onUpdateMenuNotificationSubscription = (id: string) => {
  return client.graphql({
    query: subscriptions.onUpdateMenuNotificationByCode,
    variables: {
      id,
    },
  })
}

// SUBSCRIPTION
export const onCreateRealTimeCallbackSubscription = (code: string) => {
  return client.graphql({
    query: subscriptions.onCreateRealTimeCallbackByCode,
    variables: {
      code,
    },
  })
}
