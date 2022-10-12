import type { ChakraTheme } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import * as components from 'theme/components'
import { config } from 'theme/config'
import { colors } from 'theme/foundations'
import { global } from 'theme/global'
import './overrides'

// https://chakra-ui.com/docs/styled-system/theming/customize-theme
export const customTheme: Partial<ChakraTheme> = extendTheme({
  components: { ...components },
  colors,
  config,
  styles: { global },
})
