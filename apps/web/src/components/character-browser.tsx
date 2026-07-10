'use client';

import { useQueryState, parseAsString, parseAsStringEnum } from 'nuqs';
import {
  CharacterGender,
  CharacterStatus,
  useCharactersQuery,
} from '@/graphql/generated';

const statusValues = Object.values(CharacterStatus);
const genderValues = Object.values(CharacterGender);

const statusLabels: Record<CharacterStatus, string> = {
  [CharacterStatus.Alive]: 'Alive',
  [CharacterStatus.Dead]: 'Dead',
  [CharacterStatus.Unknown]: 'Unknown',
};

const genderLabels: Record<CharacterGender, string> = {
  [CharacterGender.Male]: 'Male',
  [CharacterGender.Female]: 'Female',
  [CharacterGender.Unknown]: 'Unknown',
};

export function CharacterBrowser() {
  const [search, setSearch] = useQueryState(
    'q',
    parseAsString.withOptions({ history: 'replace', shallow: false }),
  );
  const [status, setStatus] = useQueryState(
    'status',
    parseAsStringEnum(statusValues).withOptions({ history: 'replace', shallow: false }),
  );
  const [gender, setGender] = useQueryState(
    'gender',
    parseAsStringEnum(genderValues).withOptions({ history: 'replace', shallow: false }),
  );

  const { data, isPending, isFetching, isError, error } = useCharactersQuery({
    filters: {
      search: search?.trim() || undefined,
      status: status ?? undefined,
      gender: gender ?? undefined,
    },
  });

  const clearFilters = () => {
    void setSearch(null);
    void setStatus(null);
    void setGender(null);
  };

  return (
    <main className="page-shell">
      <section className="hero" aria-labelledby="page-title">
        <h1 id="page-title">Character directory</h1>
      </section>

      <section className="filters" aria-label="Character filters">
        <label className="search-control">
          <span>Search</span>
          <input
            type="search"
            value={search ?? ''}
            onChange={(event) => void setSearch(event.target.value || null)}
            placeholder="Name or description"
          />
        </label>

        <label>
          <span>Status</span>
          <select
            value={status ?? ''}
            onChange={(event) =>
              void setStatus((event.target.value || null) as CharacterStatus | null)
            }
          >
            <option value="">All statuses</option>
            {statusValues.map((value) => (
              <option key={value} value={value}>
                {statusLabels[value]}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Gender</span>
          <select
            value={gender ?? ''}
            onChange={(event) =>
              void setGender((event.target.value || null) as CharacterGender | null)
            }
          >
            <option value="">All genders</option>
            {genderValues.map((value) => (
              <option key={value} value={value}>
                {genderLabels[value]}
              </option>
            ))}
          </select>
        </label>

        <button className="clear-button" type="button" onClick={clearFilters}>
          Clear filters
        </button>
      </section>

      <section className="results" aria-live="polite">
        <div className="results-meta">
          <p>{isFetching ? 'Updating results…' : `${data?.characters.length ?? 0} characters`}</p>
          <span>Filters are applied by the GraphQL API</span>
        </div>

        {isPending ? <LoadingGrid /> : null}

        {isError ? (
          <div className="state-card error-state" role="alert">
            <h2>Characters could not be loaded.</h2>
            <p>{error instanceof Error ? error.message : 'An unexpected network error occurred.'}</p>
          </div>
        ) : null}

        {!isPending && !isError && data?.characters.length === 0 ? (
          <div className="state-card">
            <h2>No characters match those filters.</h2>
            <p>Try a broader search or clear the active filters.</p>
          </div>
        ) : null}

        {!isPending && !isError ? (
          <div className="character-grid">
            {data?.characters.map((character) => (
              <article className="character-card" key={character.id}>
                <img src={character.image} alt="" className="portrait" />
                <div className="card-content">
                  <div className="card-heading">
                    <h2>{character.name}</h2>
                    <span className={`status-dot status-${character.status.toLowerCase()}`} aria-label={statusLabels[character.status]} />
                  </div>
                  <div className="badges">
                    <span>{statusLabels[character.status]}</span>
                    <span>{genderLabels[character.gender]}</span>
                  </div>
                  <p>{character.description}</p>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </section>

      <footer className="site-footer">
        <span>Connect with Mert Vural</span>
        <nav aria-label="Social links">
          <a href="https://github.com/mertvural1" target="_blank" rel="noreferrer">
            GitHub 1
          </a>
          <a href="https://github.com/mertvural" target="_blank" rel="noreferrer">
            GitHub 2
          </a>
          <a
            href="https://www.linkedin.com/in/mert-vural-b8080563/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </nav>
      </footer>
    </main>
  );
}

function LoadingGrid() {
  return (
    <div className="character-grid" aria-label="Loading characters">
      {Array.from({ length: 6 }, (_, index) => (
        <div className="skeleton-card" key={index}>
          <div className="skeleton portrait-skeleton" />
          <div className="skeleton-lines">
            <div className="skeleton line-long" />
            <div className="skeleton line-short" />
            <div className="skeleton line-long" />
          </div>
        </div>
      ))}
    </div>
  );
}
