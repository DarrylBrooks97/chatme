import Link from 'next/link';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NextLink = ({ href, children, className }: LinkProps) => {
  return (
    <Link href={href} passHref>
      <a className={className}>{children}</a>
    </Link>
  );
};

export default NextLink;
