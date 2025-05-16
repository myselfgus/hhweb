# Instruções de Implementação - Landing Page HEALTH/HEALTH

Este documento contém instruções para implementar as mudanças visuais e de animação na landing page.

## Melhorias Implementadas

1. **Hierarquia de Fontes**
   - Títulos principais (h1): Sora (var(--font-heading))
   - Subtítulos (h2, h3): Playfair Display (var(--font-display))
   - Cabeçalhos secundários (h4, h5, h6): Manrope (var(--font-secondary))
   - Texto de corpo: Montserrat (var(--font-sans))
   - Elementos técnicos e estatísticas: Space Grotesk (var(--font-mono))

2. **Animações e Transições**
   - Implementadas transições suaves entre seções usando GSAP
   - Adicionados efeitos de parallax para elementos de fundo
   - Criadas animações de entrada para elementos quando entram no viewport
   - Melhorado o efeito de splash screen

3. **Consistência Visual**
   - Mantida a paleta de cores baseada no logo (azuis e cianos)
   - Garantida coesão visual com classes CSS consistentes

## Instalação e Execução

1. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   # ou 
   pnpm install
   ```

2. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

3. Abra [http://localhost:3000](http://localhost:3000) no navegador para ver o resultado.

## Observações Importantes

- A estrutura do header e bottom bar foi mantida intacta
- Apenas estilos de fonte e cores foram modificados, conforme solicitado
- As animações são pontuais e não sobrecarregam a página
- Foram implementadas técnicas de lazyloading para otimização

## Classes CSS Úteis

- `.fade-in-section`: Para elementos que devem aparecer com fade ao entrar no viewport
- `.scroll-slide-effect`: Para elementos que devem deslizar ao fazer scroll
- `.cascade-item`: Para elementos que devem aparecer em cascata
- `.tech-text`, `.stat-text`: Para elementos que usam a fonte Space Grotesk
