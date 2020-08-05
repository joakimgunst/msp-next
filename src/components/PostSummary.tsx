import dayjs from 'dayjs';
import PostLink from './PostLink';
import { renderDocument } from '../contentful/render';
import { ContentfulPostSummary } from '../contentful/posts';

interface Props {
  post: ContentfulPostSummary;
}

const PostSummary: React.FC<Props> = ({ post }) => (
  <div>
    <h3 className="title">
      <PostLink slug={post.slug}>
        <a>{post.title}</a>
      </PostLink>
    </h3>
    <div className="date">{dayjs(post.date).format('LL')}</div>
    {renderDocument(post.lead.json)}

    <style jsx>{`
      .title {
        margin-bottom: 0;
      }

      .date {
        font-style: italic;
      }
    `}</style>
  </div>
);

export default PostSummary;
