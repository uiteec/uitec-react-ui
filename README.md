# componentes-react

Design system React da UITEC — biblioteca de componentes de UI (atoms/molecules) compartilhada entre projetos, extraída do ayla-painel.

📖 **Styleguide (Storybook):** publicado no GitHub Pages deste repositório após o primeiro `push` em `main` — veja em Settings → Pages a URL gerada, ou rode `pnpm storybook` localmente.

## Instalação

```bash
npm install componentes-react
```

Peer dependencies necessárias no projeto consumidor: `react`, `react-dom` e `next` (usado por componentes como `BreadcrumbsMolecule`, que usa `next/link`).

## Uso

Importe o CSS do pacote **uma vez**, na raiz da aplicação (ex: `app/layout.tsx` no Next.js):

```tsx
import "componentes-react/styles.css";
```

Esse CSS já traz os tokens de tema (cores, tipografia, animações) e as classes utilitárias Tailwind usadas pelos componentes — o projeto consumidor **não precisa ter Tailwind configurado** para os componentes funcionarem.

Depois é só importar e usar:

```tsx
import { ButtonAtom, CardAtom, BadgeAtom } from "componentes-react";

export function Exemplo() {
  return (
    <CardAtom title="Exemplo">
      <BadgeAtom variant="success">Ativo</BadgeAtom>
      <ButtonAtom text="Salvar" variant="primary" />
    </CardAtom>
  );
}
```

### Tema claro/escuro

Os componentes usam CSS custom properties que mudam de valor conforme a classe `.dark` esteja presente num elemento ancestral (geralmente `<html>`). Para alternar o tema, adicione/remova a classe `dark` (veja `theme-provider.tsx` do `boilerplate-typescript` como referência de implementação).

## Estrutura do pacote

```
src/
├─ components/
│  ├─ atoms/
│  │  ├─ buttons/       # Button, BotaoAcao, MenuAcoes, Filtro
│  │  ├─ data-display/  # Avatar, Badge, Card, Icone, Text, Tooltip, Value
│  │  ├─ decorative/    # ParticleField, ScanLine, TypingText
│  │  ├─ feedback/      # Alert, Empty, Error, Loading, Skeleton, Toast
│  │  ├─ forms/         # Todos os campos de formulário (FormTextAtom, FormSelectAtom, etc.)
│  │  └─ modal/         # Modal
│  ├─ molecules/         # Composições de atoms (Tabela, Paginação, FormControl, Breadcrumbs, etc.)
│  └─ ui/                # Wrappers finos sobre Radix UI (Dialog, Popover, Checkbox, ScrollArea)
├─ lib/utils.ts          # Helper cn() (clsx + tailwind-merge)
└─ styles/tokens.css      # Tokens de tema + import do Tailwind (fonte do dist/styles.css)
```

### Componentes com dependência externa

- **`IconeAtom`** não empacota ícones — ele renderiza um `<img>` a partir de um `src` que você fornece. Foi originalmente pensado pra carregar SVGs de `/public/assets/icones/*` do app consumidor; se seu projeto não tiver esses arquivos, passe qualquer URL válida (asset próprio, CDN, data URI). Pra ícone vetorial sem depender de arquivo externo, prefira os componentes do `lucide-react` (já é dependência interna do pacote). Detalhes no Storybook, em **Atoms → Data Display → IconeAtom → Docs**.

## Desenvolvimento

```bash
pnpm install
pnpm storybook          # sobe o styleguide local em http://localhost:6006
pnpm build               # gera dist/ (ESM + CJS + .d.ts + styles.css)
pnpm typecheck
```

## Publicação

1. Suba a versão: `npm version patch|minor|major`
2. Dê push da tag gerada: `git push --follow-tags`
3. O workflow `.github/workflows/publish.yml` publica automaticamente no npm ao detectar uma tag `vX.Y.Z` (precisa do secret `NPM_TOKEN` configurado no repositório, gerado em [npmjs.com](https://www.npmjs.com/) → Access Tokens).

O deploy do Storybook (GitHub Pages) acontece automaticamente a cada push em `main`, via `.github/workflows/storybook.yml`.
