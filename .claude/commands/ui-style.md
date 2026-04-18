# UI Style Guide — AirQuality App

Apply the following design system consistently across all React Native components in this project.

## Color Palette

```ts
const COLORS = {
  primary:     '#4361ee',   // buttons, active states, links
  background:  '#f0f4f8',   // screen background
  surface:     '#ffffff',   // cards, inputs
  border:      '#dde3ec',   // input borders, dividers
  textPrimary: '#1a1a2e',   // headings, values
  textMuted:   '#666666',   // subtitles, labels
  textLabel:   '#444444',   // form labels
  error:       '#f44336',   // error messages
  riskLow:     '#4caf50',   // Bajo
  riskMid:     '#ff9800',   // Moderado
  riskHigh:    '#f44336',   // Alto
};
```

## Typography

| Role        | fontSize | fontWeight | color        |
|-------------|----------|------------|--------------|
| Screen title| 28       | bold       | textPrimary  |
| Subtitle    | 14       | normal     | textMuted    |
| Form label  | 13       | 600        | textLabel    |
| Input text  | 16       | normal     | textPrimary  |
| Card value  | 20       | 600        | textPrimary  |
| Risk badge  | 22       | bold       | dynamic      |
| Error text  | 13       | normal     | error        |
| Button text | 16       | 700        | #ffffff      |

Labels should be UPPERCASE with `letterSpacing: 0.5`.

## Component Standards

### Inputs & Pickers
- `backgroundColor: '#fff'`
- `borderRadius: 10`
- `borderWidth: 1`, `borderColor: '#dde3ec'`
- `paddingHorizontal: 14`, `paddingVertical: 12`
- `marginBottom: 20`

### Cards (ResultCard, info blocks)
- `backgroundColor: '#fff'`
- `borderRadius: 12`
- `padding: 20`
- `borderLeftWidth: 6` with dynamic risk color
- Shadow: `elevation: 3`, `shadowOpacity: 0.1`, `shadowRadius: 6`

### Primary Button
- `backgroundColor: '#4361ee'`
- `borderRadius: 12`
- `paddingVertical: 16`
- `alignItems: 'center'`
- Disabled state: `opacity: 0.6`

### Screen Container
- `flexGrow: 1`
- `padding: 24`
- `backgroundColor: '#f0f4f8'`
- Title has `marginTop: 48`, subtitle has `marginBottom: 32`

## Rules

- Never hardcode colors inline — always reference the palette above.
- Keep StyleSheet at the bottom of each file.
- No inline styles except for dynamic values (e.g. risk color).
- Wrap every screen in `KeyboardAvoidingView` + `ScrollView`.
- Use `TouchableOpacity` for all pressable elements (no `Button`).
