
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Create directories
RUN mkdir -p /app/data

# Copy all files
COPY . .

# Train the model during build (or it will train on first run)
RUN python -c "from model import get_or_train_model; get_or_train_model()"

# Expose the API port
EXPOSE 8000

# Run the FastAPI app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
