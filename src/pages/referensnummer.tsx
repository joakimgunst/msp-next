import Head from 'next/head';
import { NextPage } from 'next';
import MainContent from '../components/MainContent';
import { siteName } from '../config';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import axios from 'axios';
import { ReferenceNumberItem } from './api/reference';

const ReferenceNumberPage: NextPage = () => {
  const [value, setValue] = useState<string>();
  const [response, setResponse] = useState<ReferenceNumberItem>();
  const [error, setError] = useState<string>();

  const notFound = error && error.includes('404');
  const otherError = error && !error.includes('404');

  async function fetchNumber() {
    if (!value) return;
    try {
      const response = await axios.get<ReferenceNumberItem>(
        `/api/reference?name=${encodeURIComponent(value)}`
      );
      setResponse(response.data);
      setError(undefined);
    } catch (e) {
      setResponse(undefined);
      setError(e.message);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setResponse(undefined);
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
    <MainContent>
      <Head>
        <title>Referensnummer – {siteName}</title>
      </Head>

      <div>
        <h1>Referensnummer</h1>
        <p>
          Alla Munksnäs Spejarnas avgifter skall betalas med ditt personliga
          referensnummer. Om du inte kommer ihåg numret kan du använda den här
          blanketten för att hämta det. Skriv in scoutens fullständiga för- och
          efternamn (inte smeknamn) i fältet och tryck på Sök. Om det här inte
          lyckas så kan du kontakta kårsekreteraren.
        </p>
        <form>
          <input
            value={value}
            aria-lanel="Namn"
            placeholder="Samuel Scout"
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
          <button type="button" onClick={fetchNumber}>
            Sök
          </button>
        </form>
        {response && (
          <div>
            Ditt referensnummer är <b>{response.referenceNumber}</b>
          </div>
        )}
        {notFound && <div>Inget referensnummer hittades</div>}
        {otherError && (
          <div>Ett problem uppstod, vänligen meddela kårsekreteraren</div>
        )}
      </div>

      <style jsx>{`
        .calendar {
          width: 100%;
          height: 600px;
        }

        form {
          margin-bottom: 8px;
        }

        input {
          margin-right: 8px;
        }
      `}</style>
    </MainContent>
  );
};

export default ReferenceNumberPage;
