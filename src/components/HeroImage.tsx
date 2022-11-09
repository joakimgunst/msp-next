import { Asset } from 'contentful';
import styled from 'styled-components';
import ContentfulImage from './ContentfulImage';

const Root = styled.div`
  width: 100%;
  height: auto;
  padding-bottom: calc(2 / 3 * 100%);
  position: relative;

  img {
    position: absolute;
    width: 100%;
    border-radius: 0.25rem;
  }
`;

interface Props {
  image: Asset;
}

const HeroImage: React.FC<Props> = ({ image }) => {
  return (
    <Root>
      <ContentfulImage image={image} width={1200} height={800} />
    </Root>
  );
};

export default HeroImage;
