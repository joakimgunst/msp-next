import { useRouter } from 'next/router';
import styled from 'styled-components';

const Root = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background: var(--color-menu);
  text-align: center;
  color: white;
`;

const ExitLink = styled.a`
  color: white;
`;

const PreviewIndicator: React.FC = () => {
  const router = useRouter();
  if (!router.isPreview) return null;
  const exitLink = `/api/exit-preview?path=${router.asPath}`;
  return (
    <Root>
      <ExitLink href={exitLink}>Exit preview mode</ExitLink>
    </Root>
  );
};

export default PreviewIndicator;
