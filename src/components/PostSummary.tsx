import { ContentfulPost } from '../contentful/data';
import dayjs from 'dayjs';
import PostLink from './PostLink';
import { renderDocument } from '../contentful/render';

interface Props {
  post: ContentfulPost;
}

const PostSummary: React.FC<Props> = ({ post }) => (
  <div>
    <h3 className="title">
      <PostLink slug={post.slug}>
        <a>{post.title}</a>
      </PostLink>
    </h3>
    <div className="date">{dayjs(post.date).format('LL')}</div>
    {renderDocument(post.lead)}

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
