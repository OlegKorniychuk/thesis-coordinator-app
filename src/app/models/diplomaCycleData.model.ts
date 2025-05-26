export enum DiplomaCyclePhase {
  preparation = 'preparation',
  supervisor_selection = 'supervisor_selection',
  topic_selection = 'topic_selection',
  post_cycle = 'post_cycle',
}

export type DiplomaCycleData = {
  diploma_cycle_id: string;
  year: number;
  start_date: Date | null;
  supervisor_selection_end_date: Date | null;
  topic_selection_end_date: Date | null;
  current_phase: DiplomaCyclePhase;
  is_active: boolean;
};
