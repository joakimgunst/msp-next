'use client';

import { useFormStatus } from 'react-dom';
import styles from './ReferenceNumberForm.module.css';
import { getReferenceNumber } from '@/actions';
import { useActionState } from 'react';

export default function ReferenceNumberForm() {
  const [state, formAction] = useActionState(getReferenceNumber, { name: '', message: '' });

  return (
    <div className={styles.root}>
      <form action={formAction}>
        {/* defaultValue keeps the entered name when the form resets on submit */}
        <input name="name" aria-label="Namn" placeholder="Samuel Scout" required defaultValue={state.name} />
        <SubmitButton />
      </form>
      {state.message && <span>{state.message}</span>}
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
