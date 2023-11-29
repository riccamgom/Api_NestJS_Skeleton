import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const simpleWeb = `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>NestJs Api TEST</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <h1>Api Test</h1>
        <p>Seed the database with test data</p>
        <button id="fetchButton">SEED</button>
        <p id="greetingText"></p>
        <script>
          document.getElementById('fetchButton').addEventListener('click', () => {
            fetch('http://localhost:3000/seeder/populate')
            .then(response => response.text())
            .then(data => {
                document.getElementById('greetingText').textContent = data;
            })
            .catch(error => console.error('Error:', error));
          });
        </script>
    </body>
    </html>`;
    return simpleWeb;
  }
}
