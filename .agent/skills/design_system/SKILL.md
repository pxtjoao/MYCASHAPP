# Design System / Tokens (mycash+)
Description: Referência oficial de tokens de design e regras de conversão para o projeto mycash+. Esta skill deve ser usada como "single source of truth" para estilos visuais, garantindo consistência com a planilha de especificações.

## 🎯 Princípios de Design
- **Single Source of Truth**: Todos os valores visuais no código DEVEM vir desta definição.
- **Hierarquia de Aplicação**:
    1.  **Variável Semântica** (se disponível): `color/action/primary`
    2.  **Variável Primitiva**: `color/blue/500`
    3.  **Conversão Inteligente**: `#3B82F6` → `blue/500`

---

## 🎨 Paleta de Cores (Tokens Primitivos)
As cores são baseadas em escalas de 50 a 950.

### Neutros (Neutral / Slate / Gray / Zinc)
- `white` (#FFFFFF) / `black` (#000000)
- Escalas completas de `slate`, `gray`, `zinc`, `neutral`, `stone` (50-950).

### Semânticas / Bases
**Feedback & Status**
- **Erro/Destrutivo (Red)**: `red/50` até `red/950`
    - Uso: Mensagens de erro, botões de exclusão, badges de alerta.
- **Sucesso/Receita (Green/Emerald)**: `green/50` até `green/950` / `emerald/50` até `emerald/950`
    - Uso: Mensagens de sucesso, valores de entrada (receitas), botões de confirmação.
- **Brand/Ação (Blue/Indigo)**: `blue/50` até `blue/950` / `indigo/50` até `indigo/950`
    - Uso: Links, botões primários, estados de foco.
- **Atenção/Aviso (Orange/Amber)**: `orange`, `amber`, `yellow` (50-950)
    - Uso: Badges pendentes, avisos não bloquantes.

**Outros**
- Escalas de `violet`, `purple`, `fuchsia`, `pink`, `rose` para categorização ou destaques específicos.

---

## 📏 Espaçamento (Spacing)
Use estes tokens para `margin`, `padding`, `gap`, `width`, `height`.
Valores em pixels (px).

| Token | Valor | Token | Valor | Token | Valor | Token | Valor |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `spacing/0` | 0px | `spacing/10` | 40px | `spacing/28` | 112px | `spacing/80` | 320px |
| `spacing/1` | 4px | `spacing/12` | 48px | `spacing/32` | 128px | `spacing/96` | 384px |
| `spacing/2` | 8px | `spacing/14` | 56px | `spacing/36` | 144px | | |
| `spacing/3` | 12px | `spacing/16` | 64px | `spacing/40` | 160px | | |
| `spacing/4` | 16px | `spacing/20` | 80px | `spacing/44` | 176px | | |
| `spacing/5` | 20px | `spacing/24` | 96px | `spacing/48` | 192px | | |
| `spacing/6` | 24px | | | `spacing/56` | 224px | | |
| `spacing/8` | 32px | | | `spacing/64` | 256px | | |

*Nota: Existe escala negativa equivalente (`spacing/-4`, etc).*

---

## 🔲 Tamanho e Forma (Size & Shape)

### Shape (Border Radius)
- `shape/0`: 0px
- `shape/4`: 4px (Botões pequenos, inputs, chips)
- `shape/8`: 8px (Cards padrão, containers médios)
- `shape/12`, `shape/16`, `shape/24`, `shape/32`: Elementos maiores.
- `shape/100`: 9999px (Pílulas/Círculos perfeitos).

### Size (Larguras/Breakpoints)
- Escala de `size/0` até `size/1440`.

---

## ✍️ Tipografia (Typography)
Hierarquia baseada em tamanho e peso.

### Font Sizes
- **Display Large**: 96px
- **Heading**:
    - XX-Large: 40px
    - X-Large: 36px
    - Large: 32px
    - Medium: 28px
    - Small: 24px
- **Body / Paragraph / Label**:
    - Large: 18px
    - Medium: 16px (Base)
    - Small: 14px
    - X-Small: 12px

### Font Weights
- `regular`: 400
- `semibold`: 600
- `bold`: 700

### Line Height
- `spaced`: 170% (1.7)

---

## 💧 Opacidade (Opacity)
- `opacity/0`, `opacity/10` ... `opacity/100` (passos de 10).

---

## ⚠️ Regras de Implementação (Tailwind)
Ao configurar o `tailwind.config.js`:
1.  Estenda o tema (`extend`), não substitua, a menos que especificado.
2.  Mapeie `colors` para usar os nomes primitivos (ex: `colors: { gray: colors.slate, primary: colors.blue }`).
3.  Para `spacing`, se necessário, estenda a escala padrão do Tailwind apenas para valores faltantes que coincidam com os tokens.
4.  **SEMPRE** prefira classes utilitárias do Tailwind que correspondam aos tokens (ex: `p-4` para `spacing/4` que é 16px).
