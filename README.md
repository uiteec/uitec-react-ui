# componentes-react

Design system React da UITEC — biblioteca de componentes de UI (atoms/molecules) compartilhada entre projetos, extraída do ayla-painel.

📖 **Styleguide (Storybook):** [react.uitec.com.br](https://react.uitec.com.br) (servidor UITEC) — também publicado no GitHub Pages deste repositório a cada `push` em `main`, ou rode `pnpm storybook` localmente.

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

## Deploy do Storybook no servidor UITEC (react.uitec.com.br)

Segue o [workflow padrão de novo projeto no servidor](.context-ia-dev/workflows/novo-projeto-servidor.md), com o Storybook rodando num container Nginx estático.

**Já feito (bootstrap manual):**
- Container `componentes-react-storybook` rodando em produção, na rede `psycs-network`, respondendo internamente em `componentes-react-storybook:80`.
- `Dockerfile`, `docker-compose.prod.yml` e `.github/workflows/deploy-storybook-server.yml` prontos no repositório pra deploys automáticos a partir daqui.

**Pendências (exigem acesso que a automação não tem):**
1. **Nginx Proxy Manager** — acessar `http://157.230.209.115:81`, criar um Proxy Host: domínio `react.uitec.com.br`, Forward Hostname `componentes-react-storybook`, Forward Port `80`, e ativar SSL (Let's Encrypt).
2. **DNS** — criar registro A de `react.uitec.com.br` apontando para `157.230.209.115`.
3. **Formalizar em `/opt/apps/`** (opcional, pra deploy automático via CI): como root/sudo no servidor, `mkdir -p /opt/apps/componentes-react/prod && chown -R deploy:deploy /opt/apps/componentes-react` e copiar `docker-compose.prod.yml` pra lá. Sem esse passo, o container atual continua funcionando, mas o workflow `deploy-storybook-server.yml` (que espera `/opt/apps/componentes-react/prod/`) só vai funcionar depois disso.
4. Autenticar o usuário `deploy` no GHCR com PAT `ghp_...` (`read:packages`, sem expiração) e adicionar `SSH_PRIVATE_KEY` nos secrets do repositório GitHub — necessário só se for usar o deploy automático via Actions.
