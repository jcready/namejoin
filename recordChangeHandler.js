import API from './lib/api'
import { pipe, map, prop, join, trim, objOf, __ } from 'ramda'
const determineName = (fieldsToJoin, record) =>
pipe(
    map(prop(__, record)),
    join(' '),
    trim
)(fieldsToJoin)

export function handler (event, cb) {
  console.log('event', event)

  const request = event.request
  const done = (e, res) => e ? cb(e) : cb(null, res)
  const { record: { id, apiName }, changeSet } = event.lxMessage.message.contents
  const priorState = event.lxMessage.message.contents.priorState || {}
  const { fields: { fieldToSet, fieldsToJoin } } = event.parameters

  const newName = determineName(fieldsToJoin, { ...priorState, ...changeSet })

  if (priorState.name !== newName) {
    console.log(`Changing name from "${priorState.name}" to "${newName}" with post to /v1/records/${apiName}/${id}.`)

    /*return request({
      method: 'PATCH',
      path: `/v1/records/${apiName}/${id}`,
      body: objOf(fieldToSet, newName)
    }, done)*/
    cb(null, 'Finished')
  } else {
    cb(null, 'No change')
  }
}
