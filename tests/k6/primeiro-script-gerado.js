import http from 'k6/http';
import { sleep, check } from 'k6';
import { expect } from "https://jslib.k6.io/k6-testing/0.5.0/index.js";

export const options = {
  vus: 10, //10 Usuarios virtuais
  duration: '30s', // em 30 segundos com 10 usuarios virtuais, eu quero que esse script seja executado
  //iterations: 1,
};

export default function() {
  let res = http.get('https://quickpizza.grafana.com');

  check(res, {
    "status is 200": (res) => res.status === 200,
    "status text deve ser igual a OK": (res) => res.status_text === "200 OK"
  })

  expect.soft(res.status).toBe(200);
  expect.soft(res.status_text).toBe("200 OK");

  sleep(1);  //suspends VU (virtual user) execution for the specified duration - 1 sec. -> Esse é o User Think Time
}
