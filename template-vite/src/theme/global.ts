import type { SystemStyleObject } from '@chakra-ui/react'

const html: SystemStyleObject = {
  height: '100%',
}

const body: SystemStyleObject = {
  height: '100%',
}

const root: SystemStyleObject = {
  height: '100%',
}

const img: SystemStyleObject = {
  userSelect: 'none',
}

export const global = { html, body, '#root': root, img }
