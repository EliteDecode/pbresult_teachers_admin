export var transactions = [];

function randomDateAsString(start, end) {
  var randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  var day = randomDate.getDate();
  var month = randomDate.toLocaleString("default", { month: "short" });
  var year = randomDate.getFullYear();
  var suffix =
    day % 10 == 1 && day != 11
      ? "st"
      : day % 10 == 2 && day != 12
      ? "nd"
      : day % 10 == 3 && day != 13
      ? "rd"
      : "th";
  return day + suffix + " " + month + " " + year;
}

var ekitiSchools = [
  "Ekiti State University",
  "Federal University Oye-Ekiti",
  "College of Education, Ikere-Ekiti",
  "Federal Polytechnic Ado-Ekiti",
  "Afe Babalola University, Ado-Ekiti",
];
var paymentModes = [
  "Credit Card",
  "Debit Card",
  "Bank Transfer",
  "Mobile Money",
];
var transactionStatuses = ["Successful", "Pending", "Failed"];

for (var i = 0; i < 40; i++) {
  var transaction = {
    TransactionId: Math.floor(Math.random() * 100000),
    name: ekitiSchools[Math.floor(Math.random() * ekitiSchools.length)],
    paymentMode: paymentModes[Math.floor(Math.random() * paymentModes.length)],
    dateCreated: randomDateAsString(new Date(2023, 0, 1), new Date()),
    validTill: randomDateAsString(new Date(), new Date(2025, 11, 31)),
    amount: Math.floor(Math.random() * 1000) + 1,
    status:
      transactionStatuses[
        Math.floor(Math.random() * transactionStatuses.length)
      ],
  };
  transactions.push(transaction);
}

export var SingleSchoolTransactions = [];

function randomDateAsString2(start, end) {
  var randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  var day = randomDate.getDate();
  var month = randomDate.toLocaleString("default", { month: "short" });
  var year = randomDate.getFullYear();
  var suffix =
    day % 10 == 1 && day != 11
      ? "st"
      : day % 10 == 2 && day != 12
      ? "nd"
      : day % 10 == 3 && day != 13
      ? "rd"
      : "th";
  return day + suffix + " " + month + " " + year;
}

var classes = ["Class A", "Class B", "Class C", "Class D"];

var studentNames = [
  "Tolu Adeyemi",
  "Femi Adebayo",
  "Bola Ogunlade",
  "Yemi Adeoti",
  "Segun Akin",
  "Lola Ojo",
  "Funmi Oladele",
  "Kunle Ojo",
  "Jide Adewale",
  "Bisi Olatunji",
  "Dapo Ogunleye",
  "Yinka Adeleke",
  "Nike Adeyemo",
  "Tunde Olatunde",
  "Yetunde Akindele",
  "Deji Ogundele",
  "Tope Ogunlola",
  "Fola Olaleye",
  "Bukky Ogunsola",
  "Wale Alabi",
];

var resultPins = ["34565", "5678", "91011", "121314", "151617", "181920"];

for (var i = 0; i < 40; i++) {
  var transaction = {
    SerialNo: i + 1,
    StudentName: studentNames[Math.floor(Math.random() * studentNames.length)],
    ResultPin: resultPins[Math.floor(Math.random() * resultPins.length)],
    Class: classes[Math.floor(Math.random() * classes.length)],
    DateCreated: randomDateAsString2(new Date(2023, 0, 1), new Date()),
    ValidTill: randomDateAsString(new Date(), new Date(2025, 11, 31)),
  };
  SingleSchoolTransactions.push(transaction);
}

function generateParentsDataArray(count) {
  const parentsData = [];

  const names = [
    "Adebowale Adeyemi",
    "Ayodeji Adekunle",
    "Olamide Adegoke",
    "Funmilayo Adebayo",
    "Oluwatobi Adeleke",
    "Abimbola Adeoti",
    "Olajumoke Adewale",
    "Olufemi Adeyinka",
    "Adetokunbo Adebiyi",
    "Olabisi Adewusi",
    "Adenike Ajayi",
    "Oladapo Afolayan",
    "Folashade Akindele",
    "Oluwaseun Akintola",
    "Adeyinka Alabi",
    "Olumide Alao",
    "Ayomide Aluko",
    "Ayotunde Alabi",
    "Olufunke Alade",
    "Temitope Amadi",
  ];
  const emails = [
    "adebowale.adeyemi@example.com",
    "ayodeji.adekunle@example.com",
    "olamide.adegoke@example.com",
    "funmilayo.adebayo@example.com",
    "oluwatobi.adeleke@example.com",
    "abimbola.adeoti@example.com",
    "olajumoke.adewale@example.com",
    "olufemi.adeyinka@example.com",
    "adetokunbo.adebiyi@example.com",
    "olabisi.adewusi@example.com",
    "adenike.ajayi@example.com",
    "oladapo.afolayan@example.com",
    "folashade.akindele@example.com",
    "oluwaseun.akintola@example.com",
    "adeyinka.alabi@example.com",
    "olumide.alao@example.com",
    "ayomide.aluko@example.com",
    "ayotunde.alabi@example.com",
    "olufunke.alade@example.com",
    "temitope.amadi@example.com",
  ];
  const phoneNumbers = [
    "123-456-7890",
    "234-567-8901",
    "345-678-9012",
    "456-789-0123",
    "567-890-1234",
    "678-901-2345",
    "789-012-3456",
    "890-123-4567",
    "901-234-5678",
    "012-345-6789",
  ];

  for (let i = 0; i < count; i++) {
    const id = i + 1;
    const name = names[Math.floor(Math.random() * names.length)];
    const email = emails[Math.floor(Math.random() * emails.length)];
    const phoneNumber =
      phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)];
    const wardsCount = Math.floor(Math.random() * 5) + 1; // Random number of wards between 1 and 5

    parentsData.push({
      name,
      id,
      wardsCount,
      phoneNumber,
      email,
    });
  }

  return parentsData;
}

export const parentsDataArray = generateParentsDataArray(30);

function generateStudentsData(count) {
  const studentsData = [];
  const firstNames = [
    "John",
    "Jane",
    "Michael",
    "Emily",
    "David",
    "Sarah",
    "Robert",
    "Jessica",
    "William",
    "Olivia",
  ];
  const lastNames = [
    "Doe",
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Davis",
    "Miller",
    "Wilson",
    "Taylor",
  ];
  const otherNames = [
    "Adeyemi",
    "Adekunle",
    "Adegoke",
    "Adebayo",
    "Adeleke",
    "Adeoti",
    "Adewale",
    "Adeyinka",
    "Adebiyi",
    "Adewusi",
  ];
  const statesOfOrigin = [
    "Lagos",
    "Ogun",
    "Oyo",
    "Osun",
    "Ondo",
    "Ekiti",
    "Kwara",
    "Kogi",
    "Edo",
    "Delta",
  ];
  const genders = ["Male", "Female"];

  for (let i = 0; i < count; i++) {
    const id = i + 1;
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const otherName = otherNames[Math.floor(Math.random() * otherNames.length)];
    const stateOfOrigin =
      statesOfOrigin[Math.floor(Math.random() * statesOfOrigin.length)];
    const gender = genders[Math.floor(Math.random() * genders.length)];
    const dob = generateRandomDOB();

    studentsData.push({
      id,
      firstName,
      lastName,
      otherName,
      stateOfOrigin,
      gender,
      dob,
    });
  }

  return studentsData;
}

function generateRandomDOB() {
  const startYear = 1990;
  const endYear = 2010;
  const year =
    Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1; // Considering 28 days for simplicity

  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
}

export const studentsDataArray = generateStudentsData(30);

export const students = [
  "John Doe",
  "Jane Smith",
  "Michael Johnson",
  "Emily Williams",
  "David Brown",
  "Sarah Jones",
  "Robert Davis",
  "Jessica Miller",
  "William Wilson",
  "Olivia Taylor",
  "Adebowale Adeyemi",
  "Ayodeji Adekunle",
  "Olamide Adegoke",
  "Funmilayo Adebayo",
  "Oluwatobi Adeleke",
  "Abimbola Adeoti",
  "Olajumoke Adewale",
  "Olufemi Adeyinka",
  "Adetokunbo Adebiyi",
  "Olabisi Adewusi",
  "Adenike Ajayi",
  "Oladapo Afolayan",
  "Folashade Akindele",
  "Oluwaseun Akintola",
  "Adeyinka Alabi",
  "Olumide Alao",
  "Ayomide Aluko",
  "Ayotunde Alabi",
  "Olufunke Alade",
  "Temitope Amadi",
];

export const subjects = [
  { subject: "Mathematics", id: 1, createdAt: "4th October" },
  { subject: "English Language", id: 2, createdAt: "5th October" },
  { subject: "Science", id: 3, createdAt: "6th October" },
  { subject: "Social Studies", id: 4, createdAt: "7th October" },
  { subject: "Creative Arts", id: 5, createdAt: "8th October" },
  { subject: "Physical Education", id: 6, createdAt: "9th October" },
  { subject: "Computer Studies", id: 7, createdAt: "10th October" },
  { subject: "French", id: 8, createdAt: "11th October" },
  { subject: "Agricultural Science", id: 9, createdAt: "12th October" },
  { subject: "Civic Education", id: 10, createdAt: "13th October" },
  { subject: "Basic Technology", id: 11, createdAt: "14th October" },
  { subject: "Home Economics", id: 12, createdAt: "15th October" },
  { subject: "Music", id: 13, createdAt: "16th October" },
  { subject: "Business Studies", id: 14, createdAt: "17th October" },
  { subject: "Christian Religious Studies", id: 15, createdAt: "18th October" },
  { subject: "Islamic Religious Studies", id: 16, createdAt: "19th October" },
  { subject: "Yoruba Language", id: 17, createdAt: "20th October" },
  { subject: "Igbo Language", id: 18, createdAt: "21st October" },
  { subject: "Hausa Language", id: 19, createdAt: "22nd October" },
  { subject: "Health Education", id: 20, createdAt: "23rd October" },
  { subject: "Literature in English", id: 21, createdAt: "24th October" },
  { subject: "History", id: 22, createdAt: "25th October" },
  { subject: "Geography", id: 23, createdAt: "26th October" },
  { subject: "Cultural and Creative Arts", id: 24, createdAt: "27th October" },
  { subject: "Financial Education", id: 25, createdAt: "28th October" },
  { subject: "Entrepreneurship Education", id: 26, createdAt: "29th October" },
  {
    subject: "Physical and Health Education",
    id: 27,
    createdAt: "30th October",
  },
  { subject: "Coding and Robotics", id: 28, createdAt: "31st October" },
  { subject: "Visual Arts", id: 29, createdAt: "1st November" },
  { subject: "Practical Life Skills", id: 30, createdAt: "2nd November" },
];

export const groupedClasses = [
  {
    className: "SS1A",
    id: 1,
    createdAt: "4th October",
    classDepartment: "Art",
  },
  {
    className: "SS1B",
    id: 2,
    createdAt: "5th October",
    classDepartment: "Science",
  },
  {
    className: "SS2C",
    id: 3,
    createdAt: "6th October",

    classDepartment: "Social Science",
  },
  {
    className: "SS2D",
    id: 4,
    createdAt: "7th October",
    classDepartment: "Art",
  },
];

export const gradingSystems = [
  [
    { grade: "A1", from: 75, to: 100, remark: "Excellent" },
    { grade: "A2", from: 70, to: 74, remark: "Very Good" },
    { grade: "B1", from: 65, to: 69, remark: "Good" },
    { grade: "B2", from: 60, to: 64, remark: "Fair" },
    { grade: "C1", from: 55, to: 59, remark: "Pass" },
    { grade: "C2", from: 50, to: 54, remark: "Pass" },
    { grade: "D", from: 0, to: 49, remark: "Fail" },
  ],
  [
    { grade: "A1", from: 85, to: 100, remark: "Excellent" },
    { grade: "A2", from: 80, to: 84, remark: "Very Good" },
    { grade: "B1", from: 75, to: 79, remark: "Good" },
    { grade: "B2", from: 70, to: 74, remark: "Fair" },
    { grade: "C1", from: 65, to: 69, remark: "Pass" },
    { grade: "C2", from: 60, to: 64, remark: "Pass" },
    { grade: "D", from: 0, to: 59, remark: "Fail" },
  ],
  [
    { grade: "A", from: 90, to: 100, remark: "Excellent" },
    { grade: "B", from: 80, to: 89, remark: "Very Good" },
    { grade: "C", from: 70, to: 79, remark: "Good" },
    { grade: "D", from: 60, to: 69, remark: "Fair" },
    { grade: "E", from: 50, to: 59, remark: "Pass" },
    { grade: "F", from: 0, to: 49, remark: "Fail" },
  ],
  [
    { grade: "A", from: 80, to: 100, remark: "Excellent" },
    { grade: "B", from: 70, to: 79, remark: "Very Good" },
    { grade: "C", from: 60, to: 69, remark: "Good" },
    { grade: "D", from: 50, to: 59, remark: "Fair" },
    { grade: "E", from: 40, to: 49, remark: "Pass" },
    { grade: "F", from: 0, to: 39, remark: "Fail" },
  ],
  [
    { grade: "A1", from: 95, to: 100, remark: "Excellent" },
    { grade: "A2", from: 90, to: 94, remark: "Very Good" },
    { grade: "B1", from: 85, to: 89, remark: "Good" },
    { grade: "B2", from: 80, to: 84, remark: "Fair" },
    { grade: "C1", from: 75, to: 79, remark: "Pass" },
    { grade: "C2", from: 70, to: 74, remark: "Pass" },
    { grade: "D", from: 0, to: 69, remark: "Fail" },
  ],
];
