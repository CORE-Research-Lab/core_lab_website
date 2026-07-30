import { HiOutlineSearch, HiOutlineX } from 'react-icons/hi'

const SearchBar = ({ query, setQuery, placeholder = 'Search', resultCount }) => {
  return (
    <div className='mt-5'>
      <label htmlFor='publication-search' className='sr-only'>
        Search research
      </label>
      <div className='relative'>
        <HiOutlineSearch
          className='pointer-events-none absolute left-0 top-1/2 size-5 -translate-y-1/2 text-slate-400'
          aria-hidden='true'
        />
        <input
          id='publication-search'
          type='search'
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='w-full border-x-0 border-b border-t-0 border-black/30 bg-transparent py-4 pl-8 pr-11 text-lg text-slate-800 transition-colors placeholder:text-slate-400 hover:border-black/60 focus:border-brand focus:outline-none [&::-webkit-search-cancel-button]:hidden'
        />
        {query && (
          <button
            type='button'
            onClick={() => setQuery('')}
            aria-label='Clear search'
            className='absolute right-0 top-1/2 -translate-y-1/2 p-2 text-slate-500 transition-colors hover:text-brand'
          >
            <HiOutlineX className='size-4' aria-hidden='true' />
          </button>
        )}
      </div>
      <p className='mt-2 text-sm text-slate-500' aria-live='polite'>
        {query
          ? `${resultCount} ${resultCount === 1 ? 'result' : 'results'} for “${query}”`
          : `${resultCount} research ${resultCount === 1 ? 'item' : 'items'}`}
      </p>
    </div>
  )
}

export default SearchBar
