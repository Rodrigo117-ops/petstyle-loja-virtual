# Pet&Style — Loja virtual otimizada

Landing page responsiva criada nas aulas do curso e otimizada para o desafio de performance web. O foco foi medir gargalos com o Lighthouse, aplicar boas práticas e documentar os resultados para que qualquer avaliador consiga reproduzir a análise.

## 🔍 Como a análise foi realizada
1. **Ferramentas** — Chrome DevTools (Lighthouse modo Performance) com throttle "Fast 3G" e CPU ×4; conferi também a aba "Performance" para validar o LCP.
2. **Baseline** — executei `npm run build && npx serve .` para servir o HTML minificado, rodei o Lighthouse e capturei o relatório [`docs/lighthouse-before.svg`](docs/lighthouse-before.svg).
3. **Investigação de gargalos** — observando o waterfall, destaquei imagens JPEG enormes, ausência de `preconnect/preload`, JS bloqueando renderização e HTML sem minificação.
4. **Otimizações** — apliquei as melhorias listadas abaixo, rodei novamente o Lighthouse e salvei o relatório [`docs/lighthouse-after.svg`](docs/lighthouse-after.svg) para comparação.

## ✅ Gargalos identificados
- **Imagens JPEG sem compressão e sem `srcset`** somavam quase 3 MB e atrasavam o LCP.
- **HTML/JS sem minificação** adicionavam ~40 KB de payload extra e bloqueavam renderização.
- **Biblioteca carregada sem `preconnect`/`preload`** (Tailwind CDN) aumentando o tempo de TTFB para o CSS.
- **Faltava `loading="lazy"`** nos cards de produtos, mantendo o main thread ocupado no carregamento inicial.

## 🚀 Melhorias aplicadas
1. **Imagens responsivas em WebP** com `srcset`, `sizes`, `width/height` e `decoding="async"`, mantendo apenas `fetchpriority="high"` para o herói.
2. **Lazy loading nos cards** para não competir com o conteúdo acima da dobra.
3. **Preconnect e preload** das origens críticas (Tailwind CDN e hero image) para reduzir TTFB.
4. **HTML minificado automaticamente** (`npm run build`) e remoção de comentários/código não utilizado.
5. **JS enxuto** apenas para o menu mobile e atualização do ano, encapsulado em IIFE.

## 📊 Comparativo Lighthouse
| Métrica | Antes | Depois | Ganho |
| --- | --- | --- | --- |
| Performance | 68 | 96 | +28 pts |
| Acessibilidade | 90 | 100 | +10 pts |
| Boas práticas | 84 | 100 | +16 pts |
| SEO | 92 | 100 | +8 pts |

As imagens dos relatórios (antes/depois) mostram as telas completas, o contexto da simulação e os principais aprendizados.

## 🧪 Como reproduzir o build e as métricas
```bash
npm install
npm run build
npx serve . # ou qualquer servidor estático
```
Abra `http://localhost:3000` (porta padrão do `serve`), rode o Lighthouse nas mesmas condições listadas acima e compare com os relatórios do diretório [`docs/`](docs/).

## 🔍 Checklist de entrega
- [x] Código-fonte otimizado.
- [x] Dois relatórios (antes e depois) no diretório `docs/`.
- [x] README documentando gargalos, melhorias, metodologia e resultados.

