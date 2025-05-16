# Instruções para Implementação de Fontes - HEALTH/HEALTH

Este documento contém instruções detalhadas para implementar apenas as fontes solicitadas na landing page, sem alterar as estruturas existentes de header e bottom bar.

## Configuração de Fontes

1. **Fontes Importadas**
   - Montserrat
   - Sora
   - Space Grotesk
   - Playfair Display
   - Manrope

2. **Como usar as fontes**
   
   As fontes foram configuradas no layout.tsx e estão disponíveis como variáveis CSS:
   
   ```css
   --font-sans: var(--font-montserrat), system-ui, sans-serif;
   --font-heading: var(--font-sora), system-ui, sans-serif;
   --font-display: var(--font-playfair), serif;
   --font-mono: var(--font-space-grotesk), monospace;
   --font-secondary: var(--font-manrope), system-ui, sans-serif;
   ```

3. **Aplicação das fontes**
   
   Para aplicar uma fonte específica, use a seguinte sintaxe em qualquer componente:
   
   ```jsx
   <div style={{ fontFamily: "var(--font-heading)" }}>Texto com fonte Sora</div>
   <div style={{ fontFamily: "var(--font-display)" }}>Texto com fonte Playfair</div>
   <div style={{ fontFamily: "var(--font-sans)" }}>Texto com fonte Montserrat</div>
   <div style={{ fontFamily: "var(--font-mono)" }}>Texto com fonte Space Grotesk</div>
   <div style={{ fontFamily: "var(--font-secondary)" }}>Texto com fonte Manrope</div>
   ```

4. **Hierarquia recomendada**
   
   - Títulos principais: Sora (--font-heading)
   - Subtítulos destacados: Playfair Display (--font-display)
   - Texto geral: Montserrat (--font-sans)
   - Elementos técnicos/estatísticas: Space Grotesk (--font-mono)
   - Elementos secundários: Manrope (--font-secondary)

## IMPORTANTE

* NÃO altere a estrutura do header e da bottom bar
* NÃO modifique a splash screen - apenas aplique estilos pontuais
* Mantenha a visibilidade dos componentes principal
* Qualquer animação deve ser pontual e não permanente
* Use lazyloading para garantir performance

## Instalação

Para garantir que as fontes sejam carregadas corretamente, execute:

```bash
npm install
# ou
yarn install
# ou 
pnpm install
```
