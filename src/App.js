import { useEffect, useState } from 'react'
import './App.scss';
import useDebounce from './hooks/useDebounce'
import Card from './components/Card'
import catIcon from './cat.svg'

function App() {
  const [catBreeds, setCatBreeds] = useState(null)
  const [searchInput, setSearchInput] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortDirection, setSortDirection] = useState('asc')
  const [isLoading, setIsLoading] = useState(false)
  const debouncedSearchInput = useDebounce(searchInput, 1000)

  useEffect(() => {
    const fetchCatBreeds = async () => {
      setIsLoading(true)
      const catBreedsRes = await fetch(`https://api.thecatapi.com/v1/breeds/search?q=${debouncedSearchInput}`)
      const catBreedsJSON = await catBreedsRes.json()

      setCatBreeds(catBreedsJSON)
      setIsLoading(false)
    }

    if (debouncedSearchInput) fetchCatBreeds()
    else setCatBreeds(null)
  }, [debouncedSearchInput])

  const renderCatBreeds = (catBreedsSorted) => {
    return catBreedsSorted.map(catBreed => {
      return <Card key={catBreed.id} data={catBreed}/>
    })
  }


  const catBreedsSort = catBreeds ? [...catBreeds] : null
  if (catBreedsSort) catBreedsSort.sort(compare(sortBy, sortDirection))

  return (
    <div className="container">
      <div className="contentContainer">
        <form className="searchForm">
          <div style={{ width: 300 }}></div>
          <input data-testid="search-input" placeholder={'Try "bengal"'} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
          <div style={{ width: 300 }}>
            <label htmlFor="sort">
              Sort By
            </label>
            <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">
                Name
              </option>
              <option value="min_weight">
                Min Weight
              </option>
              <option value="max_weight">
                Max Weight
              </option>
              <option value="min_life_span">
                Min Lifespan
              </option>
              <option value="max_life_span">
                Max Lifespan
              </option>
            </select>
            <select value={sortDirection} onChange={(e) => setSortDirection(e.target.value)}>
              <option value="asc">
                Ascending
              </option>
              <option value="desc">
                Descending
              </option>
            </select>
          </div>
          
        </form>
        {isLoading ? <div className="loaderContainer"><div data-testid="loader" className="loader">Loading...</div></div> : <div className="resultsContainer">
          {!catBreeds ? <div style={{ textAlign: 'center' }}><img src={catIcon} alt="cat" width={120} height={150} /><p className="emptyList">Cat breeds search</p></div> : catBreeds.length ? <div style={{ width: '100%', textAlign: 'center' }}><ul data-testid="ul" className="listContainer">
            {renderCatBreeds(catBreedsSort)}
          </ul></div> : <p className="emptyList">No results</p>}
        </div>}
        
      </div>

      

      <footer className="footer">
        <a
          href="https://github.com/hafizalfaza"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by&nbsp;
          <span className="author">
            Hafiz Al Faza
          </span>
        </a>
      </footer>
    </div>
  )
}

const compare = (sortBy, sortDirection) => {
  
  return (a, b) => {

    let aSortBy = null
    let bSortBy = null
    if (sortBy === 'min_weight') {
      aSortBy = parseInt(a.weight?.metric.split('-')[0])
      bSortBy = parseInt(b.weight?.metric.split('-')[0])
    } else if (sortBy === 'max_weight') {
      aSortBy = parseInt(a.weight?.metric.split('-')[1])
      bSortBy = parseInt(b.weight?.metric.split('-')[1])
    } else if (sortBy === 'min_life_span') {
      aSortBy = parseInt(a.life_span?.split('-')[0])
      bSortBy = parseInt(b.life_span?.split('-')[0])
    } else if (sortBy === 'max_life_span') {
      aSortBy = parseInt(a.life_span?.split('-')[1])
      bSortBy = parseInt(b.life_span?.split('-')[1])
    } else {
      aSortBy = a[sortBy]
      bSortBy = b[sortBy]
    }

    if ( aSortBy < bSortBy ){
      return sortDirection === 'asc' ? -1 : 1;
    }
    if ( aSortBy > bSortBy ){
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  }
}

export default App;
