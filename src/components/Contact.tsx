import styled from 'styled-components';
import { ContentfulContact } from '../contentful/data';
import ContentfulImage from './ContentfulImage';
import EmailLink from './EmailLink';
import PhoneLink from './PhoneLink';

const Root = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const StyledImage = styled(ContentfulImage)`
  width: 12rem;
  height: 16rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
`;

const ImagePlaceholder = styled.div`
  width: 12rem;
  height: 16rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  background: var(--color-shading);
`;

const Name = styled.div`
  font-weight: bold;
`;

interface Props {
  contact: ContentfulContact;
}

const Contact: React.FC<Props> = ({ contact }) => {
  const { name, image, title, email, phone } = contact;

  return (
    <Root>
      {image ? <StyledImage image={image} width={384} height={512} /> : <ImagePlaceholder />}
      <Name>{name}</Name>
      {title && <div>{title}</div>}
      {email && <EmailLink email={email} />}
      {phone && <PhoneLink phone={phone} />}
    </Root>
  );
};

export default Contact;
