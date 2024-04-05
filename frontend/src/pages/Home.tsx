import BlogCard from '@/components/BlogCard'
import { TiltCard } from '@/components/TiltCard'
import { Skeleton } from '@/components/ui/skeleton'
import { useBlogContext } from '@/context/BlogContextProvider'

function Home() {
    const blogs = useBlogContext()
    console.log('🚀 ~ Home ~ blogs:', blogs)
    return (
        <div>
            {blogs.error && <p>Error Fetching blogs...</p>}
            <div className="flex w-full flex-wrap justify-center gap-10">
                {blogs.isPending &&
                    [...Array(3)].map((_, i) => {
                        return (
                            <div
                                className="h-[350px] w-[30%] animate-pulse rounded-xl border-2"
                                key={i}
                            >
                                <Skeleton className="ml-5 mt-7 h-8 w-[80%] rounded-3xl" />
                                {[...Array(5)].map((_, i) => (
                                    <Skeleton
                                        key={i}
                                        className="ml-5 mt-7 h-2 w-[80%] rounded-3xl"
                                    />
                                ))}
                                <Skeleton className="ml-5 mt-7 h-2 w-[10%] rounded-3xl" />
                            </div>
                        )
                    })}
                {blogs?.data?.data &&
                    blogs.data.data.map((blog, i) => {
                        return (
                            <TiltCard key={i} className="w-full md:w-[30%]">
                                <BlogCard
                                    key={i}
                                    className="w-ful h-full shadow-lg transition-all duration-300 ease-linear md:hover:-translate-y-4 md:hover:shadow-2xl"
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
