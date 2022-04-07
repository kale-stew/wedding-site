import { Client, LogLevel } from '@notionhq/client'

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
  console.log('----->', responseArray)
  return responseArray
}
