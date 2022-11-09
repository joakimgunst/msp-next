import styled, { css } from 'styled-components';

interface Props {
  fullWidth?: boolean;
}

const MainContent = styled.main<Props>`
  margin-top: 2rem;
  display: grid;
  grid-gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 20rem;
    grid-gap: 3rem;

    ${({ fullWidth }) =>
      fullWidth &&
      css`
        grid-template-columns: 1fr;
      `}
  }
`;

export default MainContent;
