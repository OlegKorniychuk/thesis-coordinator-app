export enum TopicStatus {
  pending = 'pending',
  rejected = 'rejected',
  on_confirmation = 'on_confirmation',
  confirmed = 'confirmed',
}

export type Topic = {
  topic_id: string;
  bachelor_id: string;
  name: string;
  comment: string;
  status: TopicStatus;
};

export type Student = {
  student_id: string;
  first_name: string;
  second_name: string;
  last_name: string;
  group: string;
  specialty: string;
  academic_program: string;
};

export type BachelorFullData = {
  bachelor_id: string;
  student_id: string;
  user_id: string;
  supervisor_id: string | null;
  student: Student;
  topic: Topic | null;
};
