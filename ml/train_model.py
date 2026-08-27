import pandas as pd

data = pd.read_csv("ml/student_performance_clean.csv")

X = data[
    [
        "study_hours",
        "attendance",
        "previous_score",
        "sleep_hours",
        "assignments",
        "practice_tests"
    ]
]

y = data["final_score"]

print("X:")
print(X.head())

print("\ny:")
print(y.head())

print("\nX shape:")
print(X.shape)

print("\ny shape:")
print(y.shape)
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

print("\nTraining data:")
print(X_train.shape)

print("\nTesting data:")
print(X_test.shape)

print("\ny_train:")
print(y_train.shape)

print("\ny_test:")
print(y_test.shape)