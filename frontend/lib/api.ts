import { StudentMetrics, PredictionResponse } from "@/types";

const API_BASE_URL = 
  process.env.NEXT_PUBLIC_API_URL || 
  "https://student-score-backend.onrender.com";

/**
 * Sends student metrics to the FastAPI backend model endpoint.
 * Returns the predicted score from the trained Scikit-learn Linear Regression model.
 */
export async function predictScore(metrics: StudentMetrics): Promise<number> {
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(metrics),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const detail = errorData?.detail || `HTTP Error ${response.status}`;
      throw new Error(detail);
    }

    const data: PredictionResponse = await response.json();

    if (typeof data.predicted_score !== "number") {
      throw new Error("Invalid response format received from server.");
    }

    return data.predicted_score;
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Re-throw known error
      throw error;
    }
    throw new Error("Prediction service is currently unavailable. Please make sure the FastAPI backend is running.");
  }
}

/**
 * Checks backend health status.
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/`, { cache: "no-store" });
    return res.ok;
  } catch {
    return false;
  }
}
