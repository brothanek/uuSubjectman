/* eslint-disable */
const digitalContentCreateDtoInType = shape({
  contentType: oneOf(['uuCourse','uuBook','video','other']).isRequired(),
  contentName: string(200).isRequired(),
  link: uri().isRequired()
});

const digitalContentGetDtoInType = shape({
  id: id().isRequired()
});

const digitalContentEditDtoInType = shape({
  id: id().isRequired(),
  contentType: oneOf(['uuCourse','uuBook','video','other']),
  contentName: string(200),
  link: uri()
});

const digitalContentRemoveDtoInType = shape({
  id: id().isRequired()
});

const digitalContentListDtoInType = shape({
  sortBy: oneOf(["contentName","contentType"]),
  order: oneOf(["asc", "desc"]),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  })
});
