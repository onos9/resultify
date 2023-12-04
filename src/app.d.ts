import type { Config, Prisma, PrismaClient, Role, User, Class } from "@prisma/client";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

declare global {
  declare namespace App {
    interface Locals {
      user: (User & { role: Role | null } & { class: Class | null }) | null;
      configs: Config;
      userDetails: UserDetail;
    }

    // interface Error {}
    // interface PageData {}
    // interface Platform {}
  }
  var db: PrismaClient;
  type UserDetail = {
    id: 41;
    staff_no: 41;
    first_name: "EMILY";
    last_name: "TERSOO";
    full_name: "EMILY TERSOO";
    fathers_name: null;
    mothers_name: null;
    date_of_birth: "1988-04-06";
    date_of_joining: "2021-09-07";
    email: "kajoemily@gmail.com";
    mobile: "081621626910";
    emergency_mobile: null;
    marital_status: "married";
    merital_status: null;
    staff_photo: "";
    current_address: "BEHIND FEDERAL LOW COST";
    permanent_address: null;
    qualification: null;
    experience: null;
    epf_no: null;
    basic_salary: "36000";
    contract_type: "permanent";
    location: null;
    casual_leave: null;
    medical_leave: null;
    metarnity_leave: null;
    bank_account_name: "EMILY TERSOO";
    bank_account_no: null;
    bank_name: null;
    bank_brach: null;
    facebook_url: null;
    twiteer_url: null;
    linkedin_url: null;
    instragram_url: null;
    joining_letter: "";
    resume: "";
    other_document: "";
    notes: null;
    active_status: 1;
    driving_license: null;
    driving_license_ex_date: null;
    custom_field: null;
    custom_field_form_name: null;
    created_at: "2022-09-16T08:31:05.000000Z";
    updated_at: "2022-09-16T08:31:05.000000Z";
    designation_id: 6;
    department_id: 2;
    user_id: 43;
    role_id: 4;
    gender_id: 1;
    created_by: 1;
    updated_by: 1;
    school_id: 1;
    is_saas: 0;
    roles: {
      id: 4;
      name: "Teacher";
      type: "System";
      active_status: 1;
      created_by: "1";
      updated_by: "1";
      created_at: "2022-07-24T05:55:59.000000Z";
      updated_at: null;
      school_id: 1;
      is_saas: 0;
    };
    designations: {
      id: 6;
      title: "CLASS TEACHER";
      active_status: 1;
      created_at: "2022-09-06T09:17:02.000000Z";
      updated_at: "2022-09-06T09:17:02.000000Z";
      created_by: 1;
      updated_by: 1;
      school_id: 1;
      is_saas: 0;
    };
    departments: {
      id: 2;
      name: string;
      active_status: 1;
      created_at: "2022-09-06T07:42:38.000000Z";
      updated_at: "2023-10-14T23:32:03.000000Z";
      created_by: 1;
      updated_by: 1;
      school_id: 1;
      is_saas: 0;
    };
  };
}

type StudentDetail = {
  id: 11;
  admission_no: 230;
  roll_no: "1";
  first_name: "BIDEMI";
  last_name: "AWODERU";
  full_name: "BIDEMI AWODERU";
  date_of_birth: "2017-04-05";
  caste: null;
  email: null;
  mobile: null;
  admission_date: "2022-10-31";
  student_photo: "public/uploads/student/ead070ada877a24b053f655d4f2ae470.jpg";
  age: 6;
  height: null;
  weight: null;
  current_address: null;
  permanent_address: null;
  driver_id: null;
  national_id_no: null;
  local_id_no: null;
  bank_account_no: null;
  bank_name: null;
  previous_school_details: null;
  aditional_notes: null;
  ifsc_code: null;
  document_title_1: null;
  document_file_1: "";
  document_title_2: null;
  document_file_2: "";
  document_title_3: null;
  document_file_3: "";
  document_title_4: null;
  document_file_4: "";
  active_status: 1;
  custom_field: null;
  custom_field_form_name: null;
  created_at: "2023-09-11T00:00:00.000000Z";
  updated_at: "2023-09-11T00:00:00.000000Z";
  bloodgroup_id: null;
  religion_id: 5;
  route_list_id: null;
  dormitory_id: null;
  vechile_id: null;
  room_id: null;
  student_category_id: null;
  student_group_id: null;
  class_id: 26;
  section_id: 11;
  session_id: 4;
  parent_id: 175;
  user_id: 459;
  role_id: 2;
  gender_id: 1;
  school_id: 1;
  academic_id: 4;
  is_promote: 0;
  is_default: 1;
  student_id: 230;
  class_name: "GRADE 1";
  created_by: 1;
  updated_by: 1;
  section_name: "B";
  school_code: "01";
  session_year: "2023";
  parents: {
    id: 175;
    fathers_name: "KAYODE AWODERU";
    mothers_name: null;
    guardians_email: "walloy@gmail.com";
    parent_user: null;
  };
  gender: {
    id: 1;
    base_setup_name: "Male";
  };
  category: [];
};

type ClassDetail = {
  id: 3;
  active_status: 1;
  created_at: "2022-09-16T09:07:40.000000Z";
  updated_at: "2023-12-01T20:09:14.000000Z";
  class_id: 26;
  section_id: 11;
  created_by: 1;
  updated_by: 1;
  school_id: 1;
  academic_id: 4;
  class: {
    id: 26;
    class_name: "GRADE 1";
    active_status: 1;
    created_at: "2023-09-10T23:00:00.000000Z";
    updated_at: "2023-09-10T23:00:00.000000Z";
    created_by: 1;
    updated_by: 1;
    school_id: 1;
    academic_id: 4;
  };
  section: {
    id: 11;
    section_name: "B";
    active_status: 1;
    created_at: "2023-09-10T23:00:00.000000Z";
    updated_at: "2023-09-10T23:00:00.000000Z";
    created_by: 1;
    updated_by: 1;
    school_id: 1;
    academic_id: 4;
  };
  class_teachers: [
    {
      id: 21;
      active_status: 1;
      created_at: "2023-12-01T20:09:14.000000Z";
      updated_at: "2023-12-01T20:09:14.000000Z";
      teacher_id: 41;
      assign_class_teacher_id: 3;
      created_by: 1;
      updated_by: 1;
      school_id: 1;
      academic_id: 4;
    }
  ];
};
