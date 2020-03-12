import { ContentfulContact } from '../contentful/data';
import { getAssetUrl, getAssetTitle } from '../contentful/utils';
import EmailLink from './EmailLink';
import PhoneLink from './PhoneLink';

interface Props {
  contact: ContentfulContact;
}

const Contact: React.FC<Props> = ({ contact }) => {
  const { name, image, title, email, phone } = contact;
  const imageUrl = getAssetUrl(image);
  const imageTitle = getAssetTitle(image);

  return (
    <div className="contact">
      {imageUrl ? (
        <img
          className="image"
          src={imageUrl + '?fit=fill&w=384&h=512'}
          alt={imageTitle}
        />
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

        .image,
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
