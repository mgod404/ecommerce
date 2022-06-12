FROM python:3.9.10-buster
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /app

RUN apt-get update

COPY requirements.txt /app/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
COPY . /app/
RUN python manage.py migrate
