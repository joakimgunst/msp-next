import { NextPage } from 'next';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import axios from 'axios';
import { ReferenceNumberItem } from '../pages/api/reference';

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
      const response = await axios.get<ReferenceNumberItem>(
        `/api/reference?name=${encodeURIComponent(value)}`
      );
      setNumber(response.data.referenceNumber);
    } catch (e) {
      setError(e.message);
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
    <div className="grid">
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
      {otherError && (
        <span>Ett problem uppstod, vänligen meddela kårsekreteraren</span>
      )}

      <style jsx>{`
        .grid {
          display: grid;
          grid-column-gap: 16px;
          grid-row-gap: 8px;
          align-items: center;
          font-family: var(--font-sans);
        }

        @media (min-width: 640px) {
          .grid {
            grid-template-columns: auto 1fr;
          }
        }

        input {
          margin-right: 8px;
        }
      `}</style>
    </div>
  );
};

export default ReferenceNumberForm;
