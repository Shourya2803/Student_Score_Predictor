import pandas as pd
import numpy as np

# 1. Load raw data
data = pd.read_csv("ml/student_performance_raw_600.csv")

print("========== BEFORE CLEANING ==========")
print("Shape:", data.shape)

print("\nMissing values:")
print(data.isnull().sum())

print("\nData types:")
print(data.dtypes)

print("\nDuplicate rows:", data.duplicated().sum())


# ==========================================
# 2. FIX TEXT VALUES
# ==========================================

data["assignments"] = data["assignments"].replace({
    "eight": 8
})

data["practice_tests"] = data["practice_tests"].replace({
    "five": 5
})

# Convert to numeric
data["assignments"] = pd.to_numeric(data["assignments"])
data["practice_tests"] = pd.to_numeric(data["practice_tests"])


# ==========================================
# 3. FIX INVALID VALUES
# ==========================================

# Study hours cannot be negative
data.loc[
    data["study_hours"] < 0,
    "study_hours"
] = np.nan

# Attendance must be between 0 and 100
data.loc[
    (data["attendance"] < 0) | (data["attendance"] > 100),
    "attendance"
] = np.nan

# Previous score must be between 0 and 100
data.loc[
    (data["previous_score"] < 0) | (data["previous_score"] > 100),
    "previous_score"
] = np.nan

# Sleep above 12 hours is considered unrealistic for this project
data.loc[
    data["sleep_hours"] > 12,
    "sleep_hours"
] = np.nan

# Assignments should be between 0 and 10
data.loc[
    (data["assignments"] < 0) | (data["assignments"] > 10),
    "assignments"
] = np.nan

# Practice tests should be between 0 and 8
data.loc[
    (data["practice_tests"] < 0) | (data["practice_tests"] > 8),
    "practice_tests"
] = np.nan


# ==========================================
# 4. FILL MISSING VALUES
# ==========================================

numeric_columns = [
    "study_hours",
    "attendance",
    "previous_score",
    "sleep_hours",
    "assignments",
    "practice_tests"
]

for column in numeric_columns:
    data[column] = data[column].fillna(data[column].median())


# ==========================================
# 5. REMOVE DUPLICATES
# ==========================================

data = data.drop_duplicates()


# ==========================================
# 6. FINAL CHECK
# ==========================================

print("\n========== AFTER CLEANING ==========")

print("\nFinal shape:")
print(data.shape)

print("\nFinal missing values:")
print(data.isnull().sum())

print("\nFinal data types:")
print(data.dtypes)

print("\nFinal statistics:")
print(data.describe())

print("\nDuplicate rows:")
print(data.duplicated().sum())


# ==========================================
# 7. SAVE CLEAN DATA
# ==========================================

data.to_csv(
    "ml/student_performance_clean.csv",
    index=False
)

print("\nClean dataset saved successfully!")