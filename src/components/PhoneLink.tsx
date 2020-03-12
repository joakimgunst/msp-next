interface Props {
  phone: string;
}

const PhoneLink: React.FC<Props> = ({ phone }) => {
  const href = 'tel:' + phone.replace(/ /g, '');
  return <a href={href}>{phone}</a>;
};

export default PhoneLink;
