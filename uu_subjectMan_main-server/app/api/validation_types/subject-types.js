const subjectCreateDtoInType = shape({
  name: uu5String(100).isRequired(),
  credits: number(10).isRequired(),
  language: oneOf(["cz","en"]).isRequired(),
  topicIdList: array(id(), 10),
  description: uu5String(1500),
  degree: oneOf(["ing","bc"]),
  state: oneOf(["draft","active"])
});

const subjectGetDtoInType = shape({
  id: id().isRequired(),
});
