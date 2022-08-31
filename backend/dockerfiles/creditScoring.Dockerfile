FROM python:3.9-slim-buster

# Create app directory
WORKDIR /usr/src/app/

# Install app dependencies
COPY ./requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
RUN export FLASK_APP=creditscoring

# Run
EXPOSE 5001
COPY ./services/credit_scoring.py ./
CMD [ "gunicorn", "-b", "0.0.0.0:5001", "credit_scoring:app", "-w", "4"]