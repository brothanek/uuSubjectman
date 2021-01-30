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
