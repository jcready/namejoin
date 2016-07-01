import { pipe, map, prop, join, trim, objOf, __ } from 'ramda'
const determineName = (fieldsToJoin, record) => pipe(
  map(prop(__, record)),
  join(' '),
  trim
)(fieldsToJoin)

export function handler ({
  request,
  parameters: {
    fields: {
      fieldToSet,
      fieldsToJoin
    }
  },
  lxMessage: {
    message: {
      contents: {
        record: { id, apiName },
        changeSet = {},
        priorState = {}
      }
    }
  }
}, cb) {
  const done = (e, res) => e ? cb(e) : cb(null, res)
  const newName = determineName(fieldsToJoin, { ...priorState, ...changeSet })
  if (priorState.name !== newName) {
    console.log(`Changing name from "${priorState.name}" to "${newName}" with post to /v1/records/${apiName}/${id}.`)
    request({
      method: 'PATCH',
      path: `/v1/records/${apiName}/${id}`,
      body: objOf(fieldToSet, newName)
    }, done)
  } else {
    cb(null, 'No change')
  }
}
