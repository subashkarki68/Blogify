import { useParams } from 'react-router-dom'

function Blog() {
    const { blogID } = useParams()
    return <div>{blogID}</div>
}

export default Blog
