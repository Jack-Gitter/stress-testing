import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  iterations: 10,
  vus: 10,
};

export default function () {
  const response = http.get('http://localhost:3000/boats');
  sleep(1);
  const boats = JSON.parse(response.body as string);
  const availableBoat = boats.find((boat) => {
    return !boat.currentlyRented;
  });
  if (availableBoat) {
    http.patch(`http://localhost:3000/boats/rent/${availableBoat.id}`);
  }
  sleep(1);
  if (availableBoat) {
    http.patch(`http://localhost:3000/boats/return/${availableBoat.id}`);
  }
  sleep(1);
}
