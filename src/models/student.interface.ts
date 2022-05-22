interface Student {
  student_id: number;
  student_email: string;
  student_mobile: string;
  student_fisrtName: string;
  student_lastName: string;
  student_address: string;
  student_avatar: string;
}

interface ICreateStudent extends Student {
  avatar: File;
  role_id: number;
  class_id: number;
}

export type { Student, ICreateStudent };
