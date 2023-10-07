import { Client, LogLevel } from '@notionhq/client'
import { GUEST_LIST_PROPERTIES } from './constants'
const {
  ASSOCIATION,
  CHILD_1,
  CHILD_2,
  CITY,
  EMAIL,
  FIRST_NAME,
  HASH,
  ID,
  LAST_NAME,
  NUM_ADULTS,
  NUM_CHILDREN,
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

/**
 * Specifically for the formula response from notion, as it always has a .type key
 * @param {Object} data Notion API Formula response object
 * @returns {Any} returns the corresponding data type of formula.type or null
 */
const formatFormulaType = (data) => {
  switch (data?.formula?.type) {
    case 'string':
      return data?.formula?.string
    case 'number':
      return data?.formula?.number
    default:
      console.warn(
        `👋 ${data.formula.type} doesn't evaluate to a string or number. We need to update the formatFormulaType fn → notion.js  `,
      )
      return null
  }
}

/**
 * Formats the notion API response properties to a useable format
 * @param {string} property
 * @returns
 */
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
      case 'multi_select':
        return property?.multi_select
      case 'title':
        return property?.title.length > 0 ? property.title[0].plain_text : ''
      case 'formula':
        return formatFormulaType(property)
      case 'code':
        try {
          let obj = JSON.parse(property?.code.rich_text[0].plain_text)
          obj['Type'] = property?.code.caption[0].plain_text
          return obj
        } catch {
          return ''
        }
      default:
        return 'Default'
    }
  }
  return null
}

const formatPlus1s = (guestFromDb) => {
  let firstPlus1 = fmtNotionProperty(guestFromDb?.properties[CHILD_1])
  let secondPlus1 = fmtNotionProperty(guestFromDb?.properties[CHILD_2])
  if (firstPlus1 === '' && secondPlus1 === '') {
    return undefined
  }
  let builderArray = []
  firstPlus1 !== '' && builderArray.push(firstPlus1)
  secondPlus1 !== '' && builderArray.push(secondPlus1)
  return builderArray
}

const formatGuestList = (notionGuestList) => {
  return notionGuestList.map((guestItem) => {
    const returnObj = {
      email: fmtNotionProperty(guestItem?.properties[EMAIL]),
      firstName: fmtNotionProperty(guestItem?.properties[FIRST_NAME]),
      hash: fmtNotionProperty(guestItem?.properties[HASH]),
      id: fmtNotionProperty(guestItem?.properties[ID]),
      lastName: fmtNotionProperty(guestItem?.properties[LAST_NAME]),
      notionId: guestItem?.id,
      partnerFirstName: fmtNotionProperty(
        guestItem?.properties[PARTNER_FIRST_NAME],
      ),
      partnerLastName: fmtNotionProperty(
        guestItem?.properties[PARTNER_LAST_NAME],
      ),
      streetAddress: fmtNotionProperty(guestItem?.properties[STREET_ADDRESS]),
      websiteVisits: fmtNotionProperty(guestItem?.properties[WEBSITE_VISITS]),
      guestType: fmtNotionProperty(guestItem?.properties[TYPE]),
      plus1: formatPlus1s(guestItem)
    }
    return returnObj
  })
}

export const getAllPageBlocks = async () => {
  const response = await notion.blocks.children.list({ block_id: "37506cd42f14406d9c227bf35e6270d9" })
  console.log('response:', response)
  return response
}

export const getAllBlockData = async () => {
  const allIds = await getAllPageBlocks()
  let returnArray= []
  let count = 0
  while (count < allIds.results.length) {
    const response = await notion.blocks.retrieve({
      block_id: allIds.results[count].id,
    })
    if (response) {
      const children = await notion.blocks.children.list({
        block_id: response.id,
      })
      returnArray.push(children)
    }
    count++
  }
  return returnArray.map((block) => {
    let results = block.results[0]
    return fmtNotionProperty(results)
  })
  // let blockData = await formatBlockDataToWebsite(returnArray)
  return returnArray
}


/**
 * Gets all of our guests from the notion DB, we should always remember to remove the notionId
 * from anything we want to return to the front end.
 * @returns array of formatted guests
 */
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

/**
 * Updates a guest's visit count with their id property (not notion id)
 * @param {string} id
 * @returns
 */
export const updateSiteVisitCount = async (id) => {
  const guestList = await fetchAllGuests()
  const guestToUpdate = guestList.find((guest) => guest.id === id)
  if (guestToUpdate?.notionId) {
    const newVisitCount = 1 + guestToUpdate.websiteVisits
    const response = await notion.pages.update({
      page_id: guestToUpdate.notionId,
      properties: {
        [WEBSITE_VISITS]: {
          number: newVisitCount,
        },
      },
    })
    return response
  } else {
    return false
  }
}
