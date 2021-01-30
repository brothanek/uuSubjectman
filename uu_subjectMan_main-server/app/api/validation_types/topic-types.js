/* eslint-disable */
const topicCreateDtoInType = shape({
  topicName: string(200).isRequired(),
  contentIdList: array(id(), 10)
});
const topicGetDtoInType = shape({
  id: id().isRequired()
});
const topicEditDtoInType = shape({
  id: id().isRequired(),
  topicName: string(200),
  contentIdList: array(id(), 10)
});
const topicRemoveDtoInType = shape({
  id: id().isRequired()
});
const topicListDtoInType = shape({
  sortBy: oneOf(["topicName"]),
  order: oneOf(["asc", "desc"]),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  })
});
