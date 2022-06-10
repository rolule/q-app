import { Link, LinkProps } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import { isExternalUrl } from 'utils/url';

type QLinkProps = Omit<LinkProps, 'isExternal' | 'as' | 'href'> &
  RouterLinkProps;

/**
 * A link that automatically determines if the target url is extermal or not
 * @param to The target url of the link. Can be absolute, relative or external
 */
export const QLink: FunctionComponent<QLinkProps> = ({ to, ...linkProps }) => {
  const isExternal = typeof to === 'string' && isExternalUrl(to);

  if (isExternal) {
    return (
      <Link
        href={to}
        isExternal
        rel="noreferrer noopener nofollow"
        {...linkProps}
      />
    );
  }

  return <Link as={RouterLink} to={to} {...linkProps} />;
};
