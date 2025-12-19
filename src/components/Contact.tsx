import Image from "next/image";
import { ContentfulContact } from "../contentful/data";
import ContentfulImage from "./ContentfulImage";
import EmailLink from "./EmailLink";
import PhoneLink from "./PhoneLink";
import styles from "./Contact.module.css";
import placeholder from "../assets/contact_placeholder.png";

interface Props {
  contact: ContentfulContact;
}

const Contact: React.FC<Props> = ({ contact }) => {
  const { name, image, title, email, phone } = contact;

  return (
    <div className={styles.root}>
      {image ? (
        <ContentfulImage
          className={styles.image}
          image={image}
          width={192}
          height={256}
        />
      ) : (
        <Image className={styles.imagePlaceholder} src={placeholder} alt="" />
      )}
      <div className={styles.name}>{name}</div>
      {title && <div>{title}</div>}
      {email && <EmailLink email={email} />}
      {phone && <PhoneLink phone={phone} />}
    </div>
  );
};

export default Contact;
