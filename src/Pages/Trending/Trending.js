import axios from 'axios'
import React, { useState, useEffect } from 'react'
import CustomPagination from '../../components/Pagination/CustomPagination'
import SingleContent from '../../components/SingleConent/SingleContent'
import './Trending.css'
const Trending = () => {
  const [content, setContent] = useState([])
const [page, setPage] = useState(1)
  const fetchTrending = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)
    setContent(data.results)
  }
  useEffect(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchTrending()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  return (
    <>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {
          content && content.map((c) => {
            return <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.release_date || c.first_air_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          })
        }
        <CustomPagination setPage={setPage}/>
      </div>

    </>

  )
}
export default Trending
