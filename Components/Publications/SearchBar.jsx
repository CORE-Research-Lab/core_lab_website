import { HiOutlineSearch, HiOutlineX } from 'react-icons/hi'

const SearchBar = ({ query, setQuery, placeholder = 'Search', resultCount }) => {
  return (
    <div className='mt-5'>
      <label htmlFor='publication-search' className='sr-only'>
        Search research
      </label>
      <div className='relative'>
        <HiOutlineSearch
          className='pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-slate-400'
          aria-hidden='true'
        />
        <input
          id='publication-search'
          type='search'
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-11 pr-11 text-slate-800 shadow-sm transition placeholder:text-slate-400 hover:border-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 [&::-webkit-search-cancel-button]:hidden'
        />
        {query && (
          <button
            type='button'
            onClick={() => setQuery('')}
            aria-label='Clear search'
            className='absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700'
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
