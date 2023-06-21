import { ContentfulPost } from '../contentful/data';
import PostLink from './PostLink';
import { renderDocument } from '../contentful/render';
import styles from './PostSummary.module.css';
import { formatDate } from '../utils/dateUtils';

interface Props {
  post: ContentfulPost;
}

const PostSummary: React.FC<Props> = ({ post }) => (
  <div>
    <h3 className={styles.title}>
      <PostLink slug={post.slug}>{post.title}</PostLink>
    </h3>
    <div className={styles.date}>{formatDate(post.date)}</div>
    {renderDocument(post.lead)}
  </div>
);

export default PostSummary;
