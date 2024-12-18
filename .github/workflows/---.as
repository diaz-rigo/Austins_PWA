name:  Production PWA CI/CD Workflow
# name: Vercel Production Deployment

on:
  push:
    branches:
      - main
      - release/*
      - development
  pull_request:
    branches:
      - main
      - release/*
      - development
  workflow_dispatch:
    # Para ejecutar manualmente
    inputs:
      environment:
        description: Seleccionar entorno
        required: true
        default: staging

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      # 1. Checkout del código
      - name: Checkout repository
        uses: actions/checkout@v3

      # 2. Configuración de Node.js
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18' # Cambiado de '16' a '18'

      # 3. Cache de dependencias npm
      - name: Cache npm dependencies
        uses: actions/cache@v2
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-

      # 4. Instalación de dependencias
      - name: Install dependencies
        run: npm install -f

      # 5. Compilación del proyecto
      - name: Build Austins PWA
        run: npm run build

      # 6. Subir artefacto de compilación
      - name: Upload Build Artifact
        uses: actions/upload-artifact@v3
        with:
          name: build
          path: ./dist/austins




  test:
    runs-on: ubuntu-latest
    steps:
      # 1. Checkout del código
      - name: Checkout repository
        uses: actions/checkout@v3

      # 2. Configuración de Node.js
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'

      # 3. Instalación de dependencias
      - name: Install dependencies
        run: npm install -f

      # 4. Ejecución de pruebas unitarias
      - name: Run Unit Tests
        run: npm run test -- --no-watch --no-progress --browsers=ChromeHeadless

      # 5. Subir resultados de pruebas
      - name: Upload Test Results
        uses: actions/upload-artifact@v3
        with:
          name: test-results
          path: ./coverage


  Deploy-Production:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Install Vercel CLI
        run: npm install --global vercel

      - name: Pull Vercel Environment Information
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}

      - name: Build Project Artifacts
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}

      - name: Deploy Project Artifacts
        run: vercel deploy --prebuilt --prod --yes --token=${{ secrets.VERCEL_TOKEN }}
