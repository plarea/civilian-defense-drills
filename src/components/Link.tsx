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
} & RadixLinkProps;

export default function Link({
  onClick,
  replace = false,
  target,
  to,
  ...rest
}: Props) {
  const href = useHref(to);
  const handleClick = useLinkClickHandler(to, {
    replace,
    target,
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
