import { Teacher } from './teacher.model';

export enum TopicStatus {
  pending = 'pending',
  rejected = 'rejected',
  on_confirmation = 'on_confirmation',
  confirmed = 'confirmed',
}

export enum SupervisionRequestStatus {
  pending = 'pending',
  accepted = 'accepted',
  rejected = 'rejected',
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

export type BachelorUpdateData = {
  supervisorId?: string;
  firstName?: string;
  secondName?: string;
  lastName?: string;
  group?: string;
  specialty?: string;
  academicProgram?: string;
};

export type TopicConfirmData = {
  bachelorId: string;
  topicId: string;
  refinedTopic?: string;
};

export type SupervisionRequest = {
  supervision_request_id: string;
  bachelor_id: string;
  supervisor_id: string;
  comment: string | null;
  proposed_topic: string | null;
  status: SupervisionRequestStatus;
};

export type BachelorUserData = BachelorFullData & {
  supervision_requests: SupervisionRequest[];
  supervisor: {
    supervisor_id: string;
    teacher_id: string;
    max_load: number;
    teacher: Teacher;
  };
};

export type SupervisionRequestCreateData = {
  supervisor_id: string;
  comment?: string;
  proposed_topic?: string;
};
