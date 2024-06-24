import * as yup from "yup";

export const registerSchoolSchema = yup.object().shape({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  user_email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  nin: yup.string().required("NIN is required"),
  gender: yup
    .string()
    .oneOf(["M", "F"], "Invalid gender")
    .required("Gender is required"),
  phone: yup.string().required("Phone number is required"),
  position: yup.string().required("Position is required"),
  school_id_front: yup.string().required("School ID front is required"),
  school_id_back: yup.string().required("School ID back is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  school_name: yup.string().required("School name is required"),
  domain_prefix: yup.string().required("Domain prefix is required"),
  school_email: yup
    .string()
    .email("Invalid email format")
    .required("School email is required"),
  cac_number: yup.string().required("CAC number is required"),
  logo_pic: yup.string().required("Logo is required"),
  description: yup.string().required("Description is required"),
  school_type: yup
    .number()
    .min(1, "Invalid school type")
    .required("School type is required"),
  address: yup.string().required("Address is required"),
  state: yup.number().min(1, "Invalid state").required("State is required"),
});

export const LoginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const ChangePasswordSchema = yup.object().shape({
  current_password: yup
    .string()
    .required("Current password is required")
    .min(8, "Current password must be at least 8 characters long"),
  new_password: yup
    .string()
    .required("New password is required")
    .min(8, "New password must be at least 8 characters long"),
  new_password_confirmation: yup
    .string()
    .oneOf([yup.ref("new_password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

export const updateSchoolSchema = yup.object({
  name: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z0-9\s]*$/, "Invalid characters")
    .max(50, "School Name must be at most 50 characters")
    .required("School Name is required"),
  address: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z0-9\s]*$/, "Invalid characters")
    .max(100, "School Address must be at most 100 characters")
    .required("School Address is required"),
  email: yup
    .string()
    .trim()
    .email("Invalid email format")
    .required("School Email is required"),
  cac: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z0-9]*$/, "Invalid characters")
    .max(20, "CAC Number must be at most 20 characters")
    .required("School CAC Number is required"),
  adminName: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z\s]*$/, "Invalid characters")
    .max(50, "Admin Name must be at most 50 characters")
    .required("School Admin's Name is required"),
  adminEmail: yup
    .string()
    .trim()
    .email("Invalid email format")
    .required("School Admin's Email is required"),
});

export const addTeacherSchema = yup.object({
  firstname: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z0-9\s]*$/, "Invalid characters")
    .max(20, "Teachers firstname must be at most 20 characters")
    .required("Teachers firstname is required"),
  lastname: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z0-9\s]*$/, "Invalid characters")
    .max(20, "Teachers lastname must be at most 20 characters")
    .required("Teachers lastname is required"),
  gender: yup.string().required("Teachers Gender is required"),
  school_id_front: yup.string().required("School ID front is required"),
  school_id_back: yup.string().required("School ID back is required"),
  phone: yup.number().required("Teachers phone number is required"),
  email: yup
    .string()
    .trim()
    .email("Invalid email format")
    .required("Teachers email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be at least 7 characters")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z]).{5,}$/,
      "Password must include upper & lowercase, a number, and a special character"
    ),
});
export const addparentSchema = yup.object({
  fullname: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z0-9\s]*$/, "Invalid characters")
    .max(20, "Teachers fullname must be at most 20 characters")
    .required("Teachers fullname is required"),
  address: yup
    .string()
    .trim()
    .max(30, "Teachers address must be at most 30 characters")
    .required("Teachers address is required"),
  gender: yup.string().required("Teachers Gender is required"),
  email: yup
    .string()
    .trim()
    .email("Invalid email format")
    .required("Teachers email is required"),
  phone: yup
    .number()

    .required("Teachers phone number is required"),
  wards: yup.array().required("Classes taken are required"),

  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be at least 7 characters")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z]).{5,}$/,
      "Password must include upper & lowercase, a number, and a special character"
    ),
});

export const addStudentSchema = yup.object().shape({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  nin: yup.string().required("NIN is required"),
  gender: yup.string().required("Gender is required"),
  password: yup.string().min(8, "Password must be at least 8 characters long"),
  picture: yup.mixed().required("Picture is required"),
  dob: yup.date().required("Date of birth is required").nullable(),
  address: yup.string().required("Address is required"),
  phone: yup.string().required("Phone number is required"),
  date_enrolled: yup.date().required("Date enrolled is required").nullable(),
});

export const addClassSchema = yup.object({
  name: yup
    .string()
    .matches(/^[a-zA-Z0-9]+(?:[a-zA-Z0-9]+)?$/, {
      message: "Invalid characters or spaces between words",
      excludeEmptyString: true,
    })
    .max(20, "Class name must be at most 20 characters")
    .required("Class name is required"),
  school_arm_id: yup.string().required("Class arm is required"),
  maximum_subjects: yup.string().required("Maximum class subjects is required"),
  minimum_subjects: yup.string().required("Minimum class subjects is required"),
  level_id: yup.string().required("Class level is required"),
  class_category_id: yup.string().required("Class category is required"),
  description: yup.string().required("Class description is required"),
});

export const addArmSchema = yup.object().shape({
  name: yup.string().required("Product tag name is required"),
});

export const assignSubjectTeacherSchema = yup.object().shape({
  teacher_id: yup.string().required("Please select a Teacher"),
});

export const addSessionSchema = yup.object().shape({
  start_year: yup.string().required("Start year is required"),
  end_year: yup.string().required("End year is required"),
  name: yup.string().required("Name is required"),
  active: yup.boolean().required("Active status is required"),
  current: yup.boolean().required("Current status is required"),
});

export const addTermSchema = yup.object().shape({
  school_session_id: yup.string().required("School session ID is required"),
  start_date: yup.date().required("Start date is required"),
  end_date: yup
    .date()
    .required("End date is required")
    .min(yup.ref("start_date"), "End date cannot be before start date"),
  term_type: yup.string().required("Term type is required"),
  name: yup.string().required("Name is required"),
  active: yup.boolean().required("Active status is required"),
  current: yup.boolean().required("Current status is required"),
});

export const addStudentResultSchema = (assessmentTypes) => {
  const shape = {};
  assessmentTypes.forEach((grade) => {
    shape[`ca_${grade.id}`] = yup
      .number()
      .max(grade.max_score, `Must be less than or equal to ${grade.max_score}`)
      .required("Required");
  });
  return yup.object().shape(shape);
};
