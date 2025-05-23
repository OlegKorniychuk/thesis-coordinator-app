import { BachelorFullData } from './bachelor.model';
import { Teacher } from './teacher.model';

export type SupervisorWithLoad = {
  supervisor_id: string;
  max_load: number;
  teacher: Teacher;
  _count: {
    bachelors: number;
  };
};

export type SupervisorWithBachelors = SupervisorWithLoad & {
  bachelors: BachelorFullData[];
};
