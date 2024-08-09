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

  data.forEach((student) => {
    student.subjects.forEach((subject) => {
      subjects.add(subject.name);
      subject.results.forEach((result) => {
        if (!assessments[subject.name]) {
          assessments[subject.name] = {};
        }
        if (!assessments[subject.name][result.term]) {
          assessments[subject.name][result.term] = [];
        }
        result.continuous_assessment?.forEach((assessment) => {
          if (!assessments[subject.name][result.term].includes(assessment[1])) {
            assessments[subject.name][result.term].push(assessment[1]);
          }
        });
      });
    });
  });

  const result = data.map((student) => {
    const studentData = {
      student_name: student.student_name,
      key: student.student_id,
    };
    student.subjects.forEach((subject) => {
      const subjectKey = subject.name;
      subject.results.forEach((result) => {
        result.continuous_assessment?.forEach((assessment) => {
          studentData[`${subjectKey}_${result.term}_${assessment[1]}`] =
            assessment[2] ?? "N/A";
        });
        studentData[`${subjectKey}_${result.term}_cumulative_score`] =
          result.cumulative_score;
        studentData[`${subjectKey}_${result.term}_grade`] = result.grade;
      });
    });
    return studentData;
  });

  return { result, subjects: Array.from(subjects), assessments };
};
//For singleStudent Result Broadsheet

export const generateColumns = (data) => {
  let columns = [
    {
      title: "Subject",
      dataIndex: "subject_name",
      key: "subject_name",
    },
  ];

  let testColumns = new Set();

  data?.forEach((subject) => {
    subject?.results?.forEach((term) => {
      term?.continuous_assessment?.forEach((assessment) => {
        testColumns?.add(assessment[1]);
      });
    });
  });

  testColumns?.forEach((test) => {
    columns.push({
      title: test,
      dataIndex: test,
      key: test,
    });
  });

  columns = columns?.concat([
    {
      title: "First Term",
      dataIndex: "first_term",
      key: "first_term",
    },
    {
      title: "Second Term",
      dataIndex: "second_term",
      key: "second_term",
    },
    {
      title: "Third Term",
      dataIndex: "third_term",
      key: "third_term",
    },
    {
      title: "Cumulative",
      dataIndex: "total_cumulative_score",
      key: "total_cumulative_score",
    },
    {
      title: "Grade",
      dataIndex: "cumulative_grade",
      key: "cumulative_grade",
    },
  ]);

  return columns;
};

export const generateDataSource = (data) => {
  return data?.map((subject) => {
    let dataSourceItem = {
      key: subject?.subject_id,
      subject_name: subject?.subject_name,
      total_cumulative_score: subject?.total_cumulative_score,
      cumulative_grade: subject?.cumulative_grade,
    };

    subject?.results?.forEach((term) => {
      term?.continuous_assessment?.forEach((assessment) => {
        dataSourceItem[assessment[1]] = assessment[2];
      });
      if (term.term_type === "First Term") {
        dataSourceItem["first_term"] = term.score;
      } else if (term.term_type === "Second Term") {
        dataSourceItem["second_term"] = term.score;
      } else if (term.term_type === "Third Term") {
        dataSourceItem["third_term"] = term.score;
      }
    });

    return dataSourceItem;
  });
};
