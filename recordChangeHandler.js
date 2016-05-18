import API from './lib/api'

export function handler (event, cb) {
  console.log('event:', JSON.stringify(event, null, 2))
  cb(null, event)
  return
}

  // const request = API(event)
  // const done = (e, res) => e ? fail(e) : succeed(res)
  // const { record: { id, apiName }, priorState, changeSet } = event.payload
  // const wasNameChanged = 'first_name' in changeSet || 'last_name' in changeSet
  // if (!wasNameChanged) return done(null, 'No name change')
  //
  // const { first_name, last_name } = { ...priorState, ...changeSet }
  // const name = `${first_name} ${last_name}`.trim() || 'Unnamed Contact'
  //
  // console.log(`Changing name from "${priorState.name}" to "${name}" with post to /v1/records/${apiName}/${id}.`)
  //
  // return request({
  //   method: 'PATCH',
  //   path: `/v1/records/${apiName}/${id}`,
  //   body: { name }
  // }, done)
// }
