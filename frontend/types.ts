export interface StudentMetrics {
  study_hours: number;
  attendance: number;
  previous_score: number;
  sleep_hours: number;
  assignments: number;
  practice_tests: number;
}

export interface PredictionResponse {
  predicted_score: number;
}

export interface ValidationError {
  [key: string]: string;
}
