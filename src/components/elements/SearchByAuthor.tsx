import { SearchByAuthorProps } from '../../types/interfaces'
import './SearchByAuthor.css'

const SearchByAuthor: React.FC<SearchByAuthorProps> = ({

  searchAutor,
  deleteSearchAuthor,
  value
}) => {
  
  return (
    <div className="filter-container">
      <input
      value={value}
        type="text"
        placeholder="  Search by author"
        onInput={(e) => searchAutor(e.currentTarget.value)}
      />
      <button className="btn btn-danger" onClick={deleteSearchAuthor}>
        Rest
      </button>
    </div>
  )
}

export default SearchByAuthor
