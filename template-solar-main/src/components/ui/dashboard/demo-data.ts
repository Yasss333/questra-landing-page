export const levels = [
  "Remember",
  "Understand",
  "Apply",
  "Analyze",
  "Evaluate",
  "Create",
]
export const units = [
  "Foundations",
  "Linear structures",
  "Trees",
  "Graphs",
  "Algorithms",
]
export const questionTypes = [
  "MCQ",
  "Short answer",
  "Descriptive",
  "Numerical",
  "Case study",
  "Coding",
]
export type QuestionStatus =
  | "Approved"
  | "In review"
  | "Draft"
  | "Needs revision"
export type PaperStatus =
  | "Draft"
  | "Generated"
  | "Faculty review"
  | "Moderator review"
  | "Ready for approval"
  | "Approved"
  | "Locked"
export type View =
  | "Overview"
  | "Master data"
  | "Question bank"
  | "AI question studio"
  | "Coverage explorer"
  | "Question papers"
  | "Review & approval"
  | "Bloom’s analytics"
  | "Outcome mapping"
  | "Reports"
  | "Student portal"
export type Subject = {
  id: string
  name: string
  batch: string
  degree: string
  department: string
  semester: string
  pdf: boolean
  version: string
  credits: number
}
export type Question = {
  id: string
  title: string
  subjectId: string
  unit: number
  marks: number
  type: string
  bloom: number
  outcome: string
  difficulty: string
  status: QuestionStatus
  answer: string
  source: string
  version: string
  released: boolean
}
export type Paper = {
  id: string
  title: string
  subjectId: string
  status: PaperStatus
  version: string
  questions: string[]
  reviewer: string
  comments: string[]
  history: string[]
  set: string
}
export type Staff = {
  id: string
  name: string
  department: string
  role: string
  subjects: string[]
}
export type Student = {
  id: string
  name: string
  batch: string
  degree: string
  department: string
  semester: string
  email: string
  complete: boolean
  duplicate: boolean
}
export type Scope = {
  batch: string
  degree: string
  department: string
  semester: string
  subject: string
}
export type DemoReport = { name: string; subtitle: string; headers: string[]; rows: (string | number)[][] }
export const emptyScope: Scope = {
  batch: "",
  degree: "",
  department: "",
  semester: "",
  subject: "",
}
export const batches = ["2023–2027", "2024–2028", "2025–2029", "2026–2030"]
export const degrees = [
  {
    name: "B.E.",
    level: "Undergraduate",
    duration: 4,
    departments: ["Computer Science", "Mechanical", "Civil", "Electronics"],
  },
  {
    name: "B.Tech.",
    level: "Undergraduate",
    duration: 4,
    departments: ["Information Technology", "Artificial Intelligence"],
  },
  {
    name: "B.Sc.",
    level: "Undergraduate",
    duration: 3,
    departments: ["Mathematics", "Physics"],
  },
  {
    name: "B.Com.",
    level: "Undergraduate",
    duration: 3,
    departments: ["Commerce"],
  },
  {
    name: "MBA",
    level: "Postgraduate",
    duration: 2,
    departments: ["Management"],
  },
  {
    name: "MCA",
    level: "Postgraduate",
    duration: 2,
    departments: ["Computer Applications"],
  },
]
export const initialSubjects: Subject[] = [
  {
    id: "CS401",
    name: "Data Structures",
    batch: "2025–2029",
    degree: "B.E.",
    department: "Computer Science",
    semester: "IV",
    pdf: true,
    version: "v2.1",
    credits: 4,
  },
  {
    id: "CS402",
    name: "Database Management",
    batch: "2025–2029",
    degree: "B.E.",
    department: "Computer Science",
    semester: "IV",
    pdf: true,
    version: "v1.3",
    credits: 4,
  },
  {
    id: "CS403",
    name: "Operating Systems",
    batch: "2025–2029",
    degree: "B.E.",
    department: "Computer Science",
    semester: "IV",
    pdf: true,
    version: "v1.1",
    credits: 3,
  },
  {
    id: "CS404",
    name: "Computer Networks",
    batch: "2025–2029",
    degree: "B.E.",
    department: "Computer Science",
    semester: "IV",
    pdf: false,
    version: "—",
    credits: 3,
  },
  {
    id: "CS405",
    name: "Software Engineering",
    batch: "2025–2029",
    degree: "B.E.",
    department: "Computer Science",
    semester: "IV",
    pdf: true,
    version: "v1.0",
    credits: 3,
  },
  {
    id: "IT601",
    name: "Machine Learning",
    batch: "2024–2028",
    degree: "B.Tech.",
    department: "Information Technology",
    semester: "VI",
    pdf: true,
    version: "v1.2",
    credits: 4,
  },
  {
    id: "EC401",
    name: "Digital Electronics",
    batch: "2025–2029",
    degree: "B.E.",
    department: "Electronics",
    semester: "IV",
    pdf: false,
    version: "—",
    credits: 4,
  },
]
const prompts: Record<string, string[]> = {
  CS401: [
    "Explain the time complexity of binary search with an example.",
    "Compare stack and queue operations and their applications.",
    "Implement an inorder traversal of a binary search tree.",
    "Analyze BFS and DFS for detecting a cycle in a graph.",
    "Evaluate hashing strategies for a large search index.",
    "Design a priority queue for a hospital scheduling system.",
  ],
  CS402: [
    "Define functional dependency with a suitable example.",
    "Explain the difference between a primary key and a foreign key.",
    "Normalize a relational schema to third normal form.",
    "Analyze the tradeoffs of clustered and non-clustered indexes.",
    "Evaluate isolation levels in a transaction processing system.",
    "Design a database schema for a university library.",
  ],
  CS403: [
    "Define a process and describe its states.",
    "Explain the role of virtual memory in an operating system.",
    "Apply round-robin scheduling to the given process set.",
    "Analyze the conditions required for deadlock.",
    "Evaluate page replacement algorithms for a workload.",
    "Design a synchronization solution for the producer-consumer problem.",
  ],
  CS404: [
    "List the layers of the TCP/IP model.",
    "Explain the differences between TCP and UDP.",
    "Calculate the subnet mask for the given network.",
    "Analyze congestion control in a packet-switched network.",
    "Evaluate routing strategies for an enterprise network.",
    "Design a secure campus network topology.",
  ],
  CS405: [
    "Define the stages of the software development lifecycle.",
    "Explain agile development with a suitable example.",
    "Construct a use-case diagram for an online booking system.",
    "Analyze the causes of software project risk.",
    "Evaluate a testing strategy for a banking application.",
    "Design an architecture for a scalable learning platform.",
  ],
  IT601: [
    "Define supervised and unsupervised learning.",
    "Explain overfitting and regularization.",
    "Apply a decision tree to a classification problem.",
    "Analyze precision and recall for an imbalanced dataset.",
    "Evaluate model performance using cross-validation.",
    "Design a responsible model evaluation pipeline.",
  ],
  EC401: [
    "Define basic logic gates and their truth tables.",
    "Explain combinational and sequential circuits.",
    "Simplify the Boolean expression using a Karnaugh map.",
    "Analyze the propagation delay of a digital circuit.",
    "Evaluate flip-flop types for a counter design.",
    "Design a synchronous four-bit counter.",
  ],
}
export function createQuestions(): Question[] {
  return initialSubjects.flatMap((subject, si) =>
    Array.from({ length: si < 5 ? 24 : 12 }, (_, i) => {
      const bloom = [1, 2, 3, 4, 5, 6, 2, 3, 1, 2, 3, 4][i % 12]
      const status: QuestionStatus =
        i % 11 === 0
          ? "Needs revision"
          : i % 7 === 0
            ? "Draft"
            : i % 5 === 0
              ? "In review"
              : "Approved"
      return {
        id: `Q-${1001 + si * 100 + i}`,
        title: prompts[subject.id][bloom - 1],
        subjectId: subject.id,
        unit: (i % 5) + 1,
        marks: [2, 5, 10, 5, 10, 15][i % 6],
        type: questionTypes[i % 6],
        bloom,
        outcome: i % 9 === 0 ? "" : `CO${(i % 5) + 1}`,
        difficulty: ["Easy", "Medium", "Medium", "Hard"][i % 4],
        status,
        answer:
          "Start by defining the relevant concepts. Present a clear step-by-step explanation with a labelled example, justify the approach, and discuss its limitations. Award marks for accuracy, application, and reasoning.",
        source: i % 3 ? "Faculty contribution" : "Previous examination · 2024",
        version: i % 4 ? "v1.0" : "v1.1",
        released: status === "Approved" && i % 3 !== 0,
      }
    }),
  )
}
export function createPapers(questions: Question[]): Paper[] {
  const approved = questions
    .filter((q) => q.status === "Approved" && q.subjectId === "CS401")
    .map((q) => q.id)
  const statuses: PaperStatus[] = [
    "Faculty review",
    "Moderator review",
    "Ready for approval",
    "Locked",
    "Draft",
    "Approved",
  ]
  return statuses.map((status, i) => ({
    id: `QP-DS-00${i + 1}`,
    title: [
      "End Semester · Set A",
      "Internal Assessment · Set B",
      "Model Examination",
      "Internal Assessment · Final",
      "Supplementary Examination",
      "Unit Test · Trees & Graphs",
    ][i],
    subjectId: "CS401",
    status,
    version: i % 2 ? "v1.1" : "v1.0",
    questions: approved.slice(0, i % 2 ? 5 : 8),
    reviewer: ["Dr. Priya Raman", "Prof. Arun Kumar", "Dr. Meena S"][i % 3],
    comments:
      i === 1
        ? [
            "Please include an explicit complexity-analysis criterion in the rubric.",
          ]
        : [],
    history: [
      "15 Oct · Draft created",
      "18 Oct · Questions and answer outlines reviewed",
    ],
    set: i % 2 ? "B" : "A",
  }))
}
export const initialStaff: Staff[] = [
  {
    id: "ST01",
    name: "Dr. Priya Raman",
    department: "Computer Science",
    role: "Professor",
    subjects: ["CS401", "CS405"],
  },
  {
    id: "ST02",
    name: "Prof. Arun Kumar",
    department: "Computer Science",
    role: "Associate Professor",
    subjects: ["CS402", "CS403"],
  },
  {
    id: "ST03",
    name: "Dr. Meena S",
    department: "Computer Science",
    role: "Professor",
    subjects: ["CS401"],
  },
  {
    id: "ST04",
    name: "Mr. Rajesh V",
    department: "Electronics",
    role: "Assistant Professor",
    subjects: [],
  },
  {
    id: "ST05",
    name: "Dr. Kavitha R",
    department: "Information Technology",
    role: "Professor",
    subjects: ["IT601"],
  },
  {
    id: "ST06",
    name: "Dr. Vineet Kumar",
    department: "Computer Science",
    role: "Assistant Professor",
    subjects: [],
  },
]
export const initialStudents: Student[] = [
  "Ananya Raman",
  "Arjun Karthikeyan",
  "Meera Nair",
  "Rohit Sharma",
  "Sahana Prakash",
  "Aditya Menon",
  "Kavya Iyer",
  "Rahul Das",
  "Nisha Kumar",
  "Dev Patel",
  "Riya Sen",
  "Arjun Karthikeyan",
].map((name, i) => ({
  id: `25CS${1001 + i}`,
  name,
  batch: batches[i % 4],
  degree: i === 8 ? "B.Tech." : "B.E.",
  department: i === 8 ? "Information Technology" : "Computer Science",
  semester: i === 8 ? "VI" : "IV",
  email:
    i % 5 === 2 ? "" : `${name.toLowerCase().replaceAll(" ", ".")}@example.com`,
  complete: i % 5 !== 2,
  duplicate: i === 11,
}))
export const outcomes = [
  {
    id: "CO1",
    name: "Foundations",
    statement: "Explain fundamental concepts and terminology.",
    unit: 1,
  },
  {
    id: "CO2",
    name: "Linear structures",
    statement: "Implement and analyze linear data structures.",
    unit: 2,
  },
  {
    id: "CO3",
    name: "Trees & graphs",
    statement: "Analyze tree and graph traversal techniques.",
    unit: 3,
  },
  {
    id: "CO4",
    name: "Algorithms",
    statement: "Apply searching, sorting, and graph algorithms.",
    unit: 4,
  },
  {
    id: "CO5",
    name: "Design",
    statement: "Design and compare appropriate solutions to a problem.",
    unit: 5,
  },
]
export function matchesScope(subject: Subject, scope: Scope) {
  return (
    (!scope.batch || subject.batch === scope.batch) &&
    (!scope.degree || subject.degree === scope.degree) &&
    (!scope.department || subject.department === scope.department) &&
    (!scope.semester || subject.semester === scope.semester) &&
    (!scope.subject || subject.id === scope.subject)
  )
}
export function percent(part: number, total: number) {
  return total ? Math.min(100, Math.round((part / total) * 100)) : 0
}
export function csvDownload(
  name: string,
  headers: string[],
  rows: (string | number)[][],
) {
  const cell = (value: string | number) =>
    `"${String(value).replaceAll('"', '""')}"`
  const url = URL.createObjectURL(
    new Blob(
      [
        "\uFEFF" +
          [headers, ...rows].map((row) => row.map(cell).join(",")).join("\r\n"),
      ],
      { type: "text/csv;charset=utf-8" },
    ),
  )
  const link = document.createElement("a")
  link.href = url
  link.download = name
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
