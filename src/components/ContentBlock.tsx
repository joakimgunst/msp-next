import { renderDocument } from '../contentful/render';
import { Document } from '@contentful/rich-text-types';
import styled from 'styled-components';

const Root = styled.div`
  img {
    width: 100%;
    border-radius: 0.25rem;
  }
`;

interface Props {
  content: Document;
}

const ContentBlock: React.FC<Props> = ({ content }) => {
  return <Root>{renderDocument(content)}</Root>;
};

export default ContentBlock;
