export const DATA_REQUEST = 'DATA_REQUEST'
export const DATA_SUCCESS = 'DATA_SUCCESS'
export const DATA_ERROR = 'DATA_ERROR'

export const dataRequest = (dataType, aggregate) => {
  const aggregateType = aggregate || false
  return {
    type: DATA_REQUEST,
    dataType,
    aggregateType
  }
}
