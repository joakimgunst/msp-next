import { ContentfulContact } from '../contentful/data';
import ContentfulImage from './ContentfulImage';
import EmailLink from './EmailLink';
import PhoneLink from './PhoneLink';

interface Props {
  contact: ContentfulContact;
}

const Contact: React.FC<Props> = ({ contact }) => {
  const { name, image, title, email, phone } = contact;

  return (
    <div className="contact">
      {image ? (
        <ContentfulImage image={image} width={384} height={512} />
      ) : (
        <div className="image-placeholder" />
      )}
      <div className="name">{name}</div>
      {title && <div>{title}</div>}
      {email && <EmailLink email={email} />}
      {phone && <PhoneLink phone={phone} />}

      <style jsx>{`
        .contact {
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .contact :global(img),
        .image-placeholder {
          width: 12rem;
          height: 16rem;
          margin-bottom: 1rem;
          border-radius: 0.5rem;
        }

        .image-placeholder {
          background: var(--color-shading);
        }

        .name {
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default Contact;
