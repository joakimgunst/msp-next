'use client';

import { useFormState, useFormStatus } from 'react-dom';
import styles from './ReferenceNumberForm.module.css';
import { getReferenceNumber } from '@/actions';

export default function ReferenceNumberForm() {
  const [message, formAction] = useFormState(getReferenceNumber, '');

  return (
    <div className={styles.root}>
      <form action={formAction}>
        <input name="name" aria-label="Namn" placeholder="Samuel Scout" required />
        <SubmitButton />
      </form>
      {message && <span>{message}</span>}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      Sök
    </button>
  );
}
