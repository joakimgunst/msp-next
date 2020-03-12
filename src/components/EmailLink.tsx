interface Props {
  email: string;
}

const EmailLink: React.FC<Props> = ({ email }) => {
  const href = 'mailto:' + email;
  return <a href={href}>{email}</a>;
};

export default EmailLink;
