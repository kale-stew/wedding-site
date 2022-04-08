import { Client, LogLevel } from '@notionhq/client'
import { GUEST_LIST_PROPERTIES } from './constants'
const {
  NUM_ADULTS,
  NUM_CHILDREN,
  ASSOCIATION,
  CHILD_1,
  CHILD_2,
  CITY,
  EMAIL,
  FIRST_NAME,
  LAST_NAME,
  PARTNER_FIRST_NAME,
  PARTNER_LAST_NAME,
  SENT_ANNOUNCEMENT,
  STATE,
  STREET_ADDRESS,
  STREET_ADDRESS_2,
  THANK_YOU,
  TOTAL_IN_PARTY,
  TYPE,
  WEBSITE_VISITS,
} = GUEST_LIST_PROPERTIES
const guestSorts = [{ property: 'Last Name', direction: 'ascending' }]
// const guestFilters = { // if we want a filter
//   and: [{ property: 'date', date: { on_or_before: today } }],
// }

const notion = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
  logLevel: LogLevel.DEBUG,
})

const getDatabaseQueryConfig = (
  cursor = null,
  pageSize = null,
  database_id = process.env.WEDDING_GUESTS_DATABASE_ID,
) => {
  const config = {
    database_id,
  }

  if (cursor != null) {
    config['start_cursor'] = cursor
  }

  if (pageSize != null) {
    config['page_size'] = pageSize
  }

  return config
}

const fmtNotionProperty = (property) => {
  if (property !== null) {
    switch (property.type) {
      case 'rich_text':
        return property?.rich_text.length > 0
          ? property?.rich_text[0]?.plain_text
          : ''
      case 'email':
        return property?.email ? property.email : null
      case 'number':
        return property?.number ? property?.number : 0
      case 'title':
        return property?.title.length > 0 ? property.title[0].plain_text : ''
      default:
        return 'Default'
    }
  }
  return null
}

const formatGuestList = (notionGuestList) => {
  return notionGuestList.map((guestItem) => {
    const returnObj = {
      firstName: fmtNotionProperty(guestItem?.properties[FIRST_NAME]),
      lastName: fmtNotionProperty(guestItem?.properties[LAST_NAME]),
      partnerFirstName: fmtNotionProperty(
        guestItem?.properties[PARTNER_FIRST_NAME],
      ),
      partnerLastName: fmtNotionProperty(
        guestItem?.properties[PARTNER_LAST_NAME],
      ),
      email: fmtNotionProperty(guestItem?.properties[EMAIL]),
      streetAddress: fmtNotionProperty(guestItem?.properties[STREET_ADDRESS]),
      websiteVisits: fmtNotionProperty(guestItem?.properties[WEBSITE_VISITS]),
    }
    return returnObj
  })
}

export const fetchAllGuests = async () => {
  const config = getDatabaseQueryConfig()
  config.sorts = guestSorts
  // config.filter = guestFilters
  let response = await notion.databases.query(config)
  let responseArray = [...response.results]

  while (response.has_more) {
    // continue to query if next_cursor is returned
    const config = getDatabaseQueryConfig(response.next_cursor)
    config.sorts = guestSorts
    // config.filter = guestFilters
    response = await notion.databases.query(config)
    responseArray = [...responseArray, ...response.results]
  }
  return formatGuestList(responseArray)
}
