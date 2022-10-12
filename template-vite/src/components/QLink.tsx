import type { LinkProps } from '@chakra-ui/react'
import { Link } from '@chakra-ui/react'
import type { FunctionComponent } from 'react'
import type { LinkProps as RouterLinkProps } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom'
import { isExternalUrl } from 'utils/url'

type QLinkProps = Omit<LinkProps, 'as' | 'href' | 'isExternal'> &
  RouterLinkProps

/**
 * A link that automatically determines if the target url is extermal or not
 * @param to The target url of the link. Can be absolute, relative or external
 */
export const QLink: FunctionComponent<QLinkProps> = ({ to, ...linkProps }) => {
  const isExternal = typeof to === 'string' && isExternalUrl(to)

  if (isExternal) {
    return (
      <Link
        href={to}
        rel="noreferrer noopener nofollow"
        isExternal
        {...linkProps}
      />
    )
  }

  return <Link as={RouterLink} to={to} {...linkProps} />
}
