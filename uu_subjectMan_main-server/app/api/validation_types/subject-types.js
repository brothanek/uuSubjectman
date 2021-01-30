/* eslint-disable */
const subjectCreateDtoInType = shape({
  name: string(100).isRequired(),
  credits: number(50).isRequired(),
  language: oneOf(["cz","en"]).isRequired(),
  topicIdList: array(id(), 10),
  description: string(16000),
  degree: oneOf(["ing","bc"]),
  state: oneOf(["draft","active",])
});
const subjectGetDtoInType = shape({
  id: id().isRequired()
});
const subjectRemoveDtoInType = shape({
  id: id().isRequired(),
});
const subjectEditDtoInType = shape({
  id: id().isRequired(),
  name: string(100),
  credits: number(50),
  language: oneOf(["cz","en"]),
  topicId: array(id(), 10),
  description: string(16000),
  degree: oneOf(["ing","bc"]),
  state: oneOf(["draft","active"])
});
