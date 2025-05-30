import cv2
from deepface import DeepFace
import time
import csv
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor
import numpy as np
import os
from scipy.spatial.distance import cosine

# Создание папки для CSV, если её нет
os.makedirs("public", exist_ok=True)

MIN_INTERVAL_SEC = 5
SIMILARITY_THRESHOLD = 0.3
MAX_RECENT_EMBEDDINGS = 10

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
video_capture = cv2.VideoCapture(0)

executor = ThreadPoolExecutor(max_workers=1)
future = None
last_analysis_time = 0
recent_embeddings = []
results = []

last_analysis = None
last_box = None

def is_similar_embedding(e1, e2, threshold=SIMILARITY_THRESHOLD):
    return cosine(e1, e2) < threshold

def get_next_csv_path(base_name="face_stats", folder="public"):
    i = 1
    while True:
        filename = f"{base_name}_{i}.csv"
        path = os.path.join(folder, filename)
        if not os.path.exists(path):
            return path
        i += 1

while True:
    ret, frame = video_capture.read()
    if not ret:
        break

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)

    for (x, y, w, h) in faces:
        face = frame[y:y + h, x:x + w]
        last_box = (x, y, w, h)

        if future is None:
            future = executor.submit(
                DeepFace.analyze,
                face,
                actions=['age', 'gender', 'emotion'],
                enforce_detection=False
            )

        elif future.done():
            try:
                analysis = future.result()
                age = analysis[0]['age']
                gender = analysis[0]['gender']
                emotion = analysis[0]['dominant_emotion']
                embedding = DeepFace.represent(face, enforce_detection=False)[0]['embedding']
                now_time = time.time()

                is_duplicate = any(is_similar_embedding(embedding, e) for e in recent_embeddings)
                too_soon = (now_time - last_analysis_time) < MIN_INTERVAL_SEC

                if not is_duplicate and not too_soon:
                    last_analysis_time = now_time
                    recent_embeddings.append(embedding)
                    if len(recent_embeddings) > MAX_RECENT_EMBEDDINGS:
                        recent_embeddings.pop(0)

                    timestamp = datetime.now().isoformat()
                    results.append({
                        'timestamp': timestamp,
                        'age': age,
                        'gender': gender,
                        'emotion': emotion
                    })

                    last_analysis = (age, gender, emotion)

            except Exception as e:
                print(f"Error analyzing face: {e}")
            finally:
                future = None

    # Отрисовка последнего анализа
    if last_analysis and last_box:
        x, y, w, h = last_box
        age, gender, emotion = last_analysis

        cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
        cv2.putText(frame, f'Age: {age}', (x, y - 20), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
        cv2.putText(frame, f'Gender: {gender}', (x, y - 40), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
        cv2.putText(frame, f'Emotion: {emotion}', (x, y - 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)

    cv2.imshow('Video', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

video_capture.release()
cv2.destroyAllWindows()
executor.shutdown()

# Сохранение результатов в новый файл
csv_path = get_next_csv_path()

with open(csv_path, "w", newline="") as csvfile:
    fieldnames = ["timestamp", "age", "gender", "emotion"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(results)

print(f"Результаты сохранены в файл: {csv_path}")
