import { Suspense } from 'react';
import { CharacterBrowser } from '@/components/character-browser';

export default function Home() {
  return (
    <Suspense fallback={<main className="page-shell">Loading character directory…</main>}>
      <CharacterBrowser />
    </Suspense>
  );
}
