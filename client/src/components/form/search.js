import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { SearchOutlined } from "@ant-design/icons";
import { useHistory} from 'react-router-dom'


const Search = () => {
    const { search } = useSelector((state) => ({...state}))

    const { text } = search

    const dispatch = useDispatch()
    const history = useHistory()

    const handleChange = (e) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload:{text: e.target.value}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        history.push(`/shop?${text}`)
    }

    return (
        <form  className="form-inline my-2 my-lg-0" onSubmit={handleSubmit} >
            <input 
                className="form-control mr-sm-2" 
                type="search"
                value={text}
                placeholder="Search" 
                onChange={handleChange}
            />
            <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} />
        </form>
    )
}


export default Search
