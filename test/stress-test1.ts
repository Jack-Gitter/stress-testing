import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  iterations: 10,
  vus: 1,
};

export default function () {
  http.get('http://localhost:3000/boats');
  sleep(1);
  http.patch('http://localhost:3000/boats/all/rent');
  sleep(1);
  http.patch('http://localhost:3000/boats/all/return');
  sleep(1);
}
