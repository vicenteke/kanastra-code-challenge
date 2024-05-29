import os
import pytest
from fastapi.testclient import TestClient


@pytest.fixture
def client():
    # credits: https://stackoverflow.com/questions/66226692/mocking-environment-variables-during-testing
    os.environ['CSV_UPLOAD_FOLDER'] = '../uploads'

    from .main import app
    yield TestClient(app)

def test_get_files(client):
    response = client.get("/files/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_upload_empty_file(client):
    filename = 'test.csv'
    file = open(filename, 'rb')
    files = {'file': (filename, file)}
    response = client.post('/files/', files=files)
    assert response.status_code == 422
