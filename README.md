# Mindfulness com Leticia

MVP mobile-first em Expo + TypeScript para mindfulness adaptativo com Experience Sampling Method (ESM), personalização baseada em regras e armazenamento local.

## Instalação

```bash
npm install
npm run start
```

Depois:

- `i` para abrir no iOS Simulator
- `a` para abrir no Android Emulator
- ou escaneie o QR code no Expo Go

## Estrutura

- `App.tsx`: estado global do MVP e navegação entre telas
- `src/types`: modelos de dados
- `src/data`: mock data inicial
- `src/utils/personalization.ts`: lógica ESM e motor de recomendação baseado em regras
- `src/utils/storage.ts`: persistência local com AsyncStorage
- `src/components`: componentes reutilizáveis
- `src/screens`: telas do app

## Observações

- O MVP usa armazenamento local por padrão.
- O motor de personalização é transparente e comentado para facilitar a troca futura por um backend ou modelo de IA real.
- Sons ambientes estão representados como preferências e contexto de sessão no protótipo; isso deixa a arquitetura pronta para adicionar áudio real depois.
