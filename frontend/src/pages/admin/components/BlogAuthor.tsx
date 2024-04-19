interface BlogAuthorProps {
    className?: string
    author: string
}
const BlogAuthor = ({ author, className = '' }: BlogAuthorProps) => {
    return (
        <div className={className}>
            Author: <span>{author}</span>
        </div>
    )
}

export default BlogAuthor
