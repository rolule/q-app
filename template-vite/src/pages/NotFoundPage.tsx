import { Text } from '@chakra-ui/react'
import type { FunctionComponent } from 'react'
import { QLink } from 'components'

export const NotFoundPage: FunctionComponent = () => (
  <>
    <Text>This page could not be found</Text>
    <QLink to="/">Back to Startpage</QLink>
  </>
)
