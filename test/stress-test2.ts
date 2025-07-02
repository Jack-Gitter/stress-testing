import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  iterations: 10,
  vus: 10,
  thresholds: {
    http_req_duration: ['p(95)<200'],
  },
};

export default function () {
  const response = http.get('http://localhost:3000/boats');
  sleep(1);
  const boats = JSON.parse(response.body as string);
  const availableBoat = boats.find((boat) => {
    return !boat.currentlyRented;
  });
  if (availableBoat) {
    const res = http.patch(
      `http://localhost:3000/boats/rent/${availableBoat.id}`,
    );
    check(res, {
      'status was 200 or 409': (r) => r.status === 200 || r.status === 409,
    });
    sleep(1);
    if (res.status === 200) {
      http.patch(`http://localhost:3000/boats/return/${availableBoat.id}`);
    }
  }
  sleep(1);
}
