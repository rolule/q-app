import { Image } from '@chakra-ui/react'

// place default prop overrides here (use this with caution)
// see https://github.com/chakra-ui/chakra-ui/issues/1424

// prevent images from being draggable by default
Image.defaultProps = { draggable: false }
