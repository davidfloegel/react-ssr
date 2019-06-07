import * as styledComponents from 'styled-components'
import { ThemedStyledComponentsModule } from 'styled-components'

import { Theme } from 'app/typings/theme'

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
  withTheme
} = styledComponents as ThemedStyledComponentsModule<Theme>

export {
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
  withTheme
}

export default styled
