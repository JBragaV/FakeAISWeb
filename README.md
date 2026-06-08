# [AISWebFake] (https://fake-ais-web-w2bo.vercel.app/)

Projeto onde simulo de forma bem resumeida a AISWeb e a REDEMET para estudo do React/Next.


## Getting Started

To get a local copy up and running, please follow these simple steps.

### Built With

- Node.js (v20+)
- Next.js 16.2.6
- React 19.2.4
- Axios 1.16.1
- Prettier 3.8.3
- Jest 30.4.2
- Testing Library 16.3.2

### Prerequisites

- Node.js (Version: >=18.x)
- Next.js
- Axios 1.16.1

Esteira CI/CD (Deploy na Vercel)
```
YAML
name: CI/CD Pipeline

on:
  push:
    branches:
      - main
    paths:
      - "src/**"
      - ".github/workflows/**"
  pull_request:
    branches:
      - main
    paths:
      - "src/**"
      - ".github/workflows/**"
  workflow_dispatch:
env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
  API_REDEMET: ${{ secrets.API_REDEMET }}
  BASE_URL_REDEMET: ${{ vars.BASE_URL_REDEMET }}
jobs:
  tests:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout do código
        uses: actions/checkout@v4

      - name: Configurar Node.js v20
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache-dependency-path: package-lock.json
        
      - name: Instalação das dependências
        run: npm install
      
      - name: Rodaando o Lint
        run: npm run lint

      - name: Verificando formatação
        run: npm run format

      - name: Testando
        run: npm run test
  build:
    runs-on: ubuntu-latest
    needs: tests
    steps:
      - name: Checkout do código
        uses: actions/checkout@v4

      - name: Configurar Node.js v20
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache-dependency-path: package-lock.json
        
      - name: Instalação das dependências
        run: npm install
        
      - name: Rodar o buld
        run: npm run build

  deploy:
    name: Vercel Production Deployment
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Debug env
        run: |
          echo "API KEY PRESENT: ${{ secrets.API_REDEMET != '' }}" | echo "API KEY PRESENT: ${{ secrets.BASE_URL_REDEMET != '' }}"
      
      - name: Checkout do código
        uses: actions/checkout@v4

      - name: Configurar Node.js v20
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install Vercel CLI
        run: npm install --global vercel@latest
      
      - name: Deploy Project Artifacts to Vercel
        run: vercel --prod --yes --token=${{ secrets.VERCEL_TOKEN }}
```
