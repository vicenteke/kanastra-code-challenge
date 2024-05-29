import '@testing-library/jest-dom';
import axios from 'axios';


const ENDPOINT = 'http://localhost:8000/files/';
const AXIOS_POST_CONFIG = {
  headers: {
    'Content-Type': 'multipart/form-data',
  }
}

test('sending invalid data', async () => {
  try {
    await axios.post(ENDPOINT, {});
    fail('Expected request to fail');
  } catch (error: any) {
    expect(error.response.status).toBe(422);
  }
});

test('sending empty file', async () => {
  const fakeFile = new File([''], 'test.csv', { type: 'text/csv' });
  const formData = new FormData();
  formData.append('file', fakeFile);
  try {
    await axios.post(ENDPOINT, formData, AXIOS_POST_CONFIG);
    fail('Expected request to fail');
  } catch (error: any) {
    expect(error.response.status).toBe(422);
  }
});
