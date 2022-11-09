import { ContentfulPost } from '../contentful/data';
import dayjs from 'dayjs';
import PostLink from './PostLink';
import { renderDocument } from '../contentful/render';
import styled from 'styled-components';

const Title = styled.h3`
  margin-bottom: 0;
`;

const Date = styled.div`
  font-style: italic;
`;

interface Props {
  post: ContentfulPost;
}

const PostSummary: React.FC<Props> = ({ post }) => (
  <div>
    <Title>
      <PostLink slug={post.slug}>{post.title}</PostLink>
    </Title>
    <Date>{dayjs(post.date).format('LL')}</Date>
    {renderDocument(post.lead)}
  </div>
);

export default PostSummary;
