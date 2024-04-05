import BlogCard from '@/components/BlogCard'
import { TiltCard } from '@/components/TiltCard'
import { useBlogContext } from '@/context/BlogContextProvider'

function Home() {
    const blogs = useBlogContext()
    console.log('🚀 ~ Home ~ blogs:', blogs)
    return (
        <div>
            {blogs.error && <p>Error Fetching blogs...</p>}
            {blogs.isPending && <p>Loading...</p>}
            <div className="flex w-full flex-wrap justify-center gap-10">
                {blogs?.data?.data &&
                    blogs.data.data.map((blog, i) => {
                        return (
                            <TiltCard>
                                <BlogCard
                                    className="w-ful h-full shadow-lg transition-all duration-300 ease-linear hover:-translate-y-4 hover:shadow-2xl"
                                    key={i}
                                    title={blog.title}
                                    content={blog.content}
                                />
                            </TiltCard>
                        )
                    })}
            </div>
            {!blogs.error && !blogs.isPending && !blogs.data.data && (
                <p>Something went wrong...</p>
            )}
        </div>
    )
}

export default Home
