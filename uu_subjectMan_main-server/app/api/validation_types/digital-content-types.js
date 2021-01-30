/* eslint-disable */
const digitalContentCreateDtoInType = shape({
  contentType: oneOf(['uuCourse','uuBook','video','other']).isRequired(),
  contentName: string(200).isRequired(),
  link: uri().isRequired()
});

const digitalContentGetDtoInType = shape({
  id: id().isRequired()
});



