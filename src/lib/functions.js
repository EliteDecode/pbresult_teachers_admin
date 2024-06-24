export function generatePassword() {
  const numbers = "1234567890"; // Avoiding 1 and 0 to prevent confusion with letters

  let password = "";

  // Generate 6 random numbers
  for (let i = 0; i < 8; i++) {
    password += numbers[Math.floor(Math.random() * numbers.length)];
  }

  return password;
}

export function generateSchoolId(schoolName) {
  // Get the first three letters of the school name in uppercase
  const schoolCode = schoolName.substring(0, 3).toUpperCase();

  // Generate a unique ID (e.g., using a counter or a random number)
  const uniqueId = "001"; // You can replace this with actual logic to generate a unique ID

  // Get the current year
  const currentYear = new Date().getFullYear();

  // Generate the school ID in the format 'ASC/001/currentyear'
  const schoolId = `${schoolCode}/${uniqueId}/${currentYear}`;

  return schoolId;
}

export const transformData = (data) => {
  const subjects = new Set();
  const assessments = {};

  data?.forEach((student) => {
    student?.subjects?.forEach((subject) => {
      subjects?.add(subject?.subject_name);
      subject?.continuous_assessment?.forEach((assessment) => {
        if (!assessments[subject?.subject_name]) {
          assessments[subject?.subject_name] = [];
        }
        if (!assessments[subject?.subject_name]?.includes(assessment[1])) {
          assessments[subject?.subject_name]?.push(assessment[1]);
        }
      });
    });
  });

  const result = data?.map((student) => {
    const studentData = { student_name: student?.student_name };
    student?.subjects?.forEach((subject) => {
      const subjectKey = subject.subject_name;
      studentData[`${subjectKey}_cumulative_score`] = subject?.cumulative_score;
      studentData[`${subjectKey}_grade`] = subject?.grade;
      subject?.continuous_assessment?.forEach((assessment) => {
        studentData[`${subjectKey}_${assessment[1]}`] = assessment[2] ?? "N/A";
      });
    });
    return studentData;
  });

  return { result, subjects: Array.from(subjects), assessments };
};
