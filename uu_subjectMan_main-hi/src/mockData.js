export const subjects = [
  { id: 1, subjectName: "Javascript" },
  { id: 2, subjectName: "Economics" },
  { id: 3, subjectName: "Mathematics 1" },
  { id: 4, subjectName: "Mathematics 2" },
  { id: 5, subjectName: "Mathematics 3" },
];

export const subjectData = [
  {
    id: 1,
    subjectName: "Software development",
    credits: 5,
    degree: "bc",
    languages: ["CZ"],
    description: "brief subject's overview",
    topicIdList: ["1"],
    state: "active",
  },
  {
    id: 2,
    subjectName: "Mathematics",
    credits: 8,
    degree: "bc",
    languages: ["CZ", "EN"],
    description: "brief subject's overview",
    topicIdList: ["2"],
    state: "active",
  },
];

export const topicData = [
  {
    id: 1,
    topicName: "Javascript",
    contentIdList: ["12", "23"],
  },
  {
    id: 2,
    topicName: "Graph theorem",
    contentIdList: ["1", "2"],
  },
];
