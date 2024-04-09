import React from "react";
import {
  RelativeRoutingType,
  To,
  useHref,
  useLinkClickHandler,
} from "react-router-dom";
import { Link as RadixLink } from "@radix-ui/themes";

type RadixLinkProps = React.ComponentProps<typeof RadixLink>;

type Props = {
  target?: React.HTMLAttributeAnchorTarget;
  replace?: boolean;
  // state?: any;
  preventScrollReset?: boolean;
  relative?: RelativeRoutingType;
  unstable_viewTransition?: boolean;
  to: To;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state?: any;
} & RadixLinkProps;

export default function Link({
  onClick,
  replace = false,
  target,
  to,
  state,
  ...rest
}: Props) {
  const href = useHref(to);
  const handleClick = useLinkClickHandler(to, {
    replace,
    target,
    state,
  });

  return (
    <RadixLink
      {...rest}
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          handleClick(event);
        }
      }}
      target={target}
    />
  );
}
