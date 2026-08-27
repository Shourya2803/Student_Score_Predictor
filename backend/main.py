import os
import sys
from pathlib import Path
from contextlib import asynccontextmanager
import joblib
import pandas as pd
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables from .env file if present
load_dotenv()

# Ensure local backend modules can be imported seamlessly
backend_dir = Path(__file__).resolve().parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

try:
    from schemas import PredictionRequest, PredictionResponse, HealthCheckResponse
except ImportError:
    from backend.schemas import PredictionRequest, PredictionResponse, HealthCheckResponse

# Path resolution for trained ML model (supports multiple deployment layouts)
BASE_DIR = backend_dir.parent
cwd = Path.cwd()

MODEL_CANDIDATES = [
    Path(os.getenv("MODEL_PATH", "")),
    cwd / "models" / "student_score_model.pkl",
    cwd / "backend" / "models" / "student_score_model.pkl",
    backend_dir / "models" / "student_score_model.pkl",
    backend_dir.parent / "models" / "student_score_model.pkl",
    BASE_DIR / "ml" / "models" / "student_score_model.pkl",
    BASE_DIR / "backend" / "models" / "student_score_model.pkl",
    backend_dir / "student_score_model.pkl",
]

def load_trained_model():
    for candidate in MODEL_CANDIDATES:
        if candidate and candidate.exists() and candidate.is_file():
            try:
                model = joblib.load(candidate)
                print(f"[INFO] ML Model loaded successfully from: {candidate}")
                return model, candidate
            except Exception as err:
                print(f"[ERROR] Error loading ML model from {candidate}: {err}")
    return None, None

# Global reference for loaded ML model
ml_model, MODEL_PATH = load_trained_model()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan manager.
    Loads the trained Scikit-learn ML model when FastAPI starts up.
    """
    global ml_model, MODEL_PATH
    if ml_model is None:
        ml_model, MODEL_PATH = load_trained_model()

    yield

    # Clean up resources on shutdown
    ml_model = None


app = FastAPI(
    title="Student Score Predictor API",
    description="Machine Learning REST API for predicting student final scores based on academic and lifestyle attributes.",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS dynamically for production & development
raw_origins = os.getenv("ALLOWED_ORIGINS", "*")
if raw_origins.strip() == "*":
    origins = ["*"]
else:
    origins = [origin.strip() for origin in raw_origins.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True if "*" not in origins else False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get(
    "/",
    response_model=HealthCheckResponse,
    summary="Health Check & System Status",
    description="Returns the current operating status of the backend API and checks if the model is ready."
)
def read_root():
    """
    Root endpoint for health check.
    """
    global ml_model, MODEL_PATH
    if ml_model is None:
        ml_model, MODEL_PATH = load_trained_model()

    return HealthCheckResponse(
        status="healthy",
        message="Student Score Predictor API is up and running.",
        model_loaded=(ml_model is not None)
    )


@app.post(
    "/predict",
    response_model=PredictionResponse,
    summary="Predict Student Final Score",
    description="Accepts validated student metrics, formats input for the ML model, and returns predicted final score (0-100)."
)
def predict(request: PredictionRequest):
    """
    Prediction endpoint.
    Passes validated request data to the trained linear regression model.
    """
    global ml_model, MODEL_PATH
    if ml_model is None:
        ml_model, MODEL_PATH = load_trained_model()

    if ml_model is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Trained ML model is not loaded on the server. Please verify model deployment."
        )

    try:
        # Preserve exact feature ordering as expected by the trained model
        feature_dict = {
            "study_hours": request.study_hours,
            "attendance": request.attendance,
            "previous_score": request.previous_score,
            "sleep_hours": request.sleep_hours,
            "assignments": request.assignments,
            "practice_tests": request.practice_tests
        }

        # Convert dictionary to DataFrame with exact column order
        input_dataframe = pd.DataFrame([feature_dict])

        # Run inference
        raw_prediction = ml_model.predict(input_dataframe)[0]

        # Convert numpy float to standard Python float and round to 2 decimal places
        final_score_prediction = float(round(raw_prediction, 2))

        return PredictionResponse(predicted_score=final_score_prediction)

    except Exception as err:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while calculating the prediction: {err}"
        )
