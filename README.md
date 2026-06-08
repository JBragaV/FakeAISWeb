# AISWebFake

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
name: CI/CD Versel Deploy

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  # ---------------------------------------------------------
  # ETAPA 1: Integração Contínua (CI)
  # ---------------------------------------------------------
  ci:
    name: Build & Test
    runs-on: ubuntu-latest

    steps:
      - name: Checkout do código
        uses: actions/checkout@v4

      - name: Configurar Node.js v20
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Instalar dependências
        run: npm ci

      - name: Rodar Lint
        run: npm run lint

      - name: Rodar Testes
        run: npm run test

      - name: Rodar Build
        # Injeta variáveis de ambiente fakes caso o Next.js exija na hora do build
        env:
          NEXT_PUBLIC_API_URL: https://api.redemet.aer.mil.br
          REDEMET_API_KEY: dummy_key_for_build
        run: npm run build

  # ---------------------------------------------------------
  # ETAPA 2: Deploy Automatizado (CD) - Apenas Push na Main
  # ---------------------------------------------------------
  cd:
    name: Deploy to Vercel
    runs-on: ubuntu-latest
    needs: ci # Garante que o deploy só ocorre se o CI passar
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'

    steps:
      - name: Checkout do código
        uses: actions/checkout@v4

      - name: Deploy para Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```