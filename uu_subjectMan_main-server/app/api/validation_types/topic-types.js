/* eslint-disable */
const topicCreateDtoInType = shape({
  topicName: string(200).isRequired(),
  contentIdList: array(id(), 10)
});
