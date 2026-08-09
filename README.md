# uitec-react-ui

Design system React da UITEC — biblioteca de componentes de UI (atoms/molecules) compartilhada entre projetos, extraída do ayla-painel.

📖 **Styleguide (Storybook):** [uiteec.github.io/uitec-react-ui](https://uiteec.github.io/uitec-react-ui/) (GitHub Pages, publicado a cada `push` em `main`), ou rode `pnpm storybook` localmente.

## Instalação

```bash
npm install uitec-react-ui
```

Peer dependencies necessárias no projeto consumidor: `react`, `react-dom` e `next` (usado por componentes como `BreadcrumbsMolecule`, que usa `next/link`).

## Uso

Importe o CSS do pacote **uma vez**, na raiz da aplicação (ex: `app/layout.tsx` no Next.js):

```tsx
import "uitec-react-ui/styles.css";
```

Esse CSS já traz os tokens de tema (cores, tipografia, animações) e as classes utilitárias Tailwind usadas pelos componentes — o projeto consumidor **não precisa ter Tailwind configurado** para os componentes funcionarem.

Depois é só importar e usar:

```tsx
import { ButtonAtom, CardAtom, BadgeAtom } from "uitec-react-ui";

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

O pacote já está publicado como [`uitec-react-ui`](https://www.npmjs.com/package/uitec-react-ui) no npm público.

### Fluxo normal (automático, sem OTP)

1. Suba a versão: `npm version patch|minor|major` (isso já cria a tag git correspondente).
2. Dê push da tag gerada: `git push --follow-tags`.
3. O workflow `.github/workflows/publish.yml` builda e publica automaticamente no npm ao detectar uma tag `vX.Y.Z`, usando o secret `NPM_TOKEN` do repositório — nenhuma interação manual (sem OTP) é necessária.

### Configurar o secret `NPM_TOKEN` (setup único)

1. Em [npmjs.com](https://www.npmjs.com) → avatar → **Access Tokens** → **Generate New Token** → **Granular Access Token**.
2. **Permissions**: Read and write. **Packages and scopes**: `uitec-react-ui`. Ativar **"Bypass two-factor authentication"**.
3. Copiar o token gerado (`npm_...`, só aparece uma vez).
4. No GitHub → repositório → **Settings** → **Secrets and variables** → **Actions** → **New repository secret** → nome `NPM_TOKEN`, valor o token copiado.

### Publicação manual (fallback, exige OTP)

Se precisar publicar direto da sua máquina sem passar pelo Actions:

```bash
pnpm run build
npm publish
```

Isso vai pedir autenticação (`npm login`) e um código OTP do seu autenticador a cada publish, já que a sessão de login normal do npm não tem bypass de 2FA — só o token granular configurado acima tem.

O deploy do Storybook (GitHub Pages) acontece automaticamente a cada push em `main`, via `.github/workflows/storybook.yml`.
