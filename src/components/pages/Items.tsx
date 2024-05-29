import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {BounceLoader} from 'react-spinners'
import {RootState} from '../../redux/store'
import {useNavigate} from 'react-router-dom'

import {
  countChangedItem,
  deleteIAlltem,
  fetchData,
} from '../../redux/slices/itemsSlices'
import Footer from '../elements/Footer'
import Item from '../elements/Item'
import './Items.css'
import SearchByAuthor from '../elements/SearchByAuthor'
import {ArrOfObj} from '../../types/interfaces'

const Items = () => {
  const isLogin = useSelector((state: RootState) => state.items.isLogin)
  const data = useSelector((state: RootState) => state.items.data)

  const [currentItems, setcurrentItems] = useState<ArrOfObj[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    setcurrentItems(data)
  }, [data])

  const dispatch = useDispatch()

  const quantity: number = currentItems.length

  const handleUpdateItemList = () => {
    if (quantity) {
      dispatch(deleteIAlltem())
    }
    dispatch(countChangedItem())
    setIsLoading(true)
    dispatch(fetchData() as any)
      .then(() => setIsLoading(false))
      .catch(() => setIsError(true))
  }

  const handleSearchAuthor = (value: string) => {
    setSearchValue(value)
    const regex: RegExp = new RegExp(value.trim(), 'i')
    setcurrentItems(currentItems.filter((item) => regex.test(item.author)))
  }

  const handleDeleteSearchAuthor = () => {
    setSearchValue('')
    setcurrentItems(data)
  }

  useEffect(() => {
    if (!isLogin) {
      navigate('/')
    }
  }, [isLogin, navigate])

  return (
    <div className="img-background__blur">
      <div className="class-container">
        <main>
          <div className="items-container">
            <div className="items-controller">
              {quantity !== 1 ? (
                <h2>Items:{quantity}</h2>
              ) : (
                <h2>Item:{quantity} </h2>
              )}
              <button
                className="btn btn-success "
                onClick={handleUpdateItemList}
              >
                Download items
              </button>
              <SearchByAuthor
                searchAutor={handleSearchAuthor}
                deleteSearchAuthor={handleDeleteSearchAuthor}
                value={searchValue}
              />
            </div>
            {!quantity && !isLoading && (
              <div className="items-box-message">
                <p>Please download items...</p>
              </div>
            )}
            <div className={isLoading ? 'items-box-spiner' : 'items-box'}>
              {isLoading && (
                <div className="loading-spinner">
                  <BounceLoader color={'#123abc'} loading={true} />
                </div>
              )}
              {isError && <h1>Loading error </h1>}
              {currentItems.map(({id, url, author, uuId, isChanged}) => (
                <Item
                  key={uuId}
                  price={+id}
                  img={url}
                  author={author}
                  itemId={id}
                  isChanged={isChanged}
                />
              ))}
            </div>
          </div>
        </main>
        <footer className="class-footer">
          <Footer />
        </footer>
      </div>
    </div>
  )
}

export default Items
