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

export const contentData = [
  {
    id: 1,
    contentType: "document", // content type uuCourse,uuBook,video,other
    contentName: "Introduction to Project Management",
    link:
      "https://plus4u.net/ues/sesm;jsessionid=F8D2672FA2092FCD8122B584B7CDEC36.0tcde38?REQID=7qGVyCTKqtk=&WINID=l01&action=r$b:2a@1-0&SessFree=sues%253A118500965363973101%253A50946989935530620", // link to digital content
  },
  {
    id: 2,
    contentType: "video", // content type uuCourse,uuBook,video,other
    contentName: "Introduction to Python",
    link:
      "https://plus4u.net/ues/sesm;jsessionid=F8D2672FA2092FCD8122B584B7CDEC36.0tcde38?REQID=7qGVyCTKqtk=&WINID=l01&action=r$b:2a@1-0&SessFree=sues%253A118500965363973101%253A50946989935530620", // link to digital content
  },
];
