import pandas as pd
import matplotlib.pyplot as plt

data = pd.read_csv("ml/student_performance_clean.csv")

print("Dataset shape:")
print(data.shape)

print("\nStatistics:")
print(data.describe())

plt.scatter(data["study_hours"], data["final_score"])

plt.xlabel("Study Hours")
plt.ylabel("Final Score")
plt.title("Study Hours vs Final Score")

plt.show()

print("\nCorrelation with final score:")

print(
    data[
        [
            "study_hours",
            "attendance",
            "previous_score",
            "sleep_hours",
            "assignments",
            "practice_tests",
            "final_score"
        ]
    ].corr()["final_score"].sort_values(ascending=False)
)

plt.scatter(data["attendance"], data["final_score"])
plt.xlabel("Attendance")
plt.ylabel("Final Score")
plt.title("Attendance vs Final Score")
plt.show()


plt.scatter(data["previous_score"], data["final_score"])
plt.xlabel("Previous Score")
plt.ylabel("Final Score")
plt.title("Previous Score vs Final Score")
plt.show()


plt.scatter(data["sleep_hours"], data["final_score"])
plt.xlabel("Sleep Hours")
plt.ylabel("Final Score")
plt.title("Sleep Hours vs Final Score")
plt.show()


plt.scatter(data["assignments"], data["final_score"])
plt.xlabel("Assignments")
plt.ylabel("Final Score")
plt.title("Assignments vs Final Score")
plt.show()


plt.scatter(data["practice_tests"], data["final_score"])
plt.xlabel("Practice Tests")
plt.ylabel("Final Score")
plt.title("Practice Tests vs Final Score")
plt.show()

correlation = data[
    [
        "study_hours",
        "attendance",
        "previous_score",
        "sleep_hours",
        "assignments",
        "practice_tests",
        "final_score"
    ]
].corr()

print("\nCorrelation Matrix:")
print(correlation)

import seaborn as sns

plt.figure(figsize=(10, 6))

sns.heatmap(
    correlation,
    annot=True,
    cmap="coolwarm",
    fmt=".2f"
)

plt.title("Correlation Matrix")
plt.show()

plt.figure(figsize=(10, 6))

sns.heatmap(
    correlation,
    annot=True,
    cmap="coolwarm",
    fmt=".2f"
)

plt.title("Correlation Matrix")

plt.savefig("ml/correlation_heatmap.png", dpi=300, bbox_inches="tight")

plt.show()