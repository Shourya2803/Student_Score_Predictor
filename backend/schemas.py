from pydantic import BaseModel, Field


class PredictionRequest(BaseModel):
    """
    Input schema for student score prediction.
    Enforces sensible validation ranges on all input features.
    """
    study_hours: float = Field(
        ...,
        ge=0,
        le=24,
        description="Daily or weekly study hours (0 to 24)",
        json_schema_extra={"example": 6.0}
    )
    attendance: float = Field(
        ...,
        ge=0,
        le=100,
        description="Class attendance percentage (0 to 100)",
        json_schema_extra={"example": 85.0}
    )
    previous_score: float = Field(
        ...,
        ge=0,
        le=100,
        description="Previous academic test score (0 to 100)",
        json_schema_extra={"example": 72.0}
    )
    sleep_hours: float = Field(
        ...,
        ge=0,
        le=24,
        description="Average daily sleep hours (0 to 24)",
        json_schema_extra={"example": 7.0}
    )
    assignments: float = Field(
        ...,
        ge=0,
        description="Total assignments completed (minimum 0)",
        json_schema_extra={"example": 8.0}
    )
    practice_tests: float = Field(
        ...,
        ge=0,
        description="Total practice tests completed (minimum 0)",
        json_schema_extra={"example": 5.0}
    )


class PredictionResponse(BaseModel):
    """
    Output schema for prediction result.
    """
    predicted_score: float = Field(
        ...,
        description="Predicted final student score out of 100",
        json_schema_extra={"example": 74.6}
    )


class HealthCheckResponse(BaseModel):
    """
    Output schema for API status check.
    """
    status: str = Field(..., description="API operational status")
    message: str = Field(..., description="Informational message")
    model_loaded: bool = Field(..., description="Indicates if ML model is ready")
