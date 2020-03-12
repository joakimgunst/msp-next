import { renderDocument } from '../contentful/render';
import { Document } from '@contentful/rich-text-types';

interface Props {
  content: Document;
}

const ContentBlock: React.FC<Props> = ({ content }) => {
  return (
    <div className="content">
      {renderDocument(content)}

      <style jsx>{`
        .content :global(img) {
          width: 100%;
          border-radius: 0.25rem;
        }
      `}</style>
    </div>
  );
};

export default ContentBlock;
