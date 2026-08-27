FROM python:3.11-slim

WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code and trained model
COPY . .

# Expose port
EXPOSE 8000

# Start production server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
