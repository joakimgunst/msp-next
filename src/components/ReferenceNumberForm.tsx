import ky from 'ky';
import { NextPage } from 'next';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import styled from 'styled-components';
import media from '../media';
import { ReferenceNumberItem } from '../pages/api/reference';

const Root = styled.div`
  display: grid;
  grid-column-gap: 16px;
  grid-row-gap: 8px;
  align-items: center;
  font-family: var(--font-sans);

  @media ${media.sm} {
    grid-template-columns: auto 1fr;
  }

  input {
    margin-right: 8px;
  }
`;

const ReferenceNumberForm: NextPage = () => {
  const [value, setValue] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState<number>();
  const [error, setError] = useState<string>();

  const notFound = error && error.includes('404');
  const otherError = error && !error.includes('404');

  async function fetchNumber() {
    if (!value) return;
    try {
      setNumber(undefined);
      setError(undefined);
      setLoading(true);
      const data = await ky.get(`/api/reference?name=${encodeURIComponent(value)}`).json<ReferenceNumberItem>();
      setNumber(data.referenceNumber);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
    setLoading(false);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setNumber(undefined);
    setError(undefined);
    setValue(e.target.value);
  }

  function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      fetchNumber();
    }
  }

  return (
    <Root>
      <form>
        <input
          value={value}
          aria-label="Namn"
          placeholder="Samuel Scout"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <button type="button" disabled={!value} onClick={fetchNumber}>
          Sök
        </button>
      </form>
      {loading && <span>Söker...</span>}
      {number && <span>Ditt referensnummer är {number}</span>}
      {notFound && <span>Inget referensnummer hittades</span>}
      {otherError && <span>Ett problem uppstod, vänligen meddela kårsekreteraren</span>}
    </Root>
  );
};

export default ReferenceNumberForm;
