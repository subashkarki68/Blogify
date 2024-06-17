import BlogCard from '@/components/BlogCard'
import { TiltCard } from '@/components/TiltCard'
import { Skeleton } from '@/components/ui/skeleton'
import { useBlogContext } from '@/context/BlogContextProvider'
import { Link } from 'react-router-dom'
import Typewriter from 'typewriter-effect'
import HomeCover from '../assets/home-cover.jpg'
import Paginate from '../components/Paginate'

function Home() {
    const { blogs } = useBlogContext()
    return (
        <div>
            <div className="relative mb-10 w-full">
                <div className="relative">
                    <div>
                        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-black opacity-60"></div>
                        <img
                            src={HomeCover}
                            alt="Cover Image"
                            className="z-1 h-[100vh] w-full object-cover"
                        />
                    </div>
                    <div className="absolute top-1/2">
                        <h2 className="ml-10 text-7xl text-white">
                            <Typewriter
                                options={{
                                    strings: [
                                        'Welcome to Blogify',
                                        'Engage',
                                        'Elevate',
                                        'Inspire',
                                        'Connect',
                                        'Discover',
                                        'Empower',
                                        'Enrich',
                                        'Transform',
                                        'Innovate',
                                        'Enlighten',
                                        'Explore',
                                        'Create',
                                    ],
                                    autoStart: true,
                                    loop: true,
                                }}
                            />
                        </h2>
                    </div>
                </div>
            </div>
            {blogs.error && <p>Error Fetching blogs...</p>}
            <div className="flex w-full flex-wrap justify-center gap-10">
                <Paginate
                    page={blogs.page}
                    limit={blogs.limit}
                    setLimit={blogs.setLimit}
                    total={blogs.total}
                    setPage={blogs.setPage}
                />
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
                                <Link to={`/blog/${blog.slug}`}>
                                    <BlogCard
                                        key={i}
                                        className="w-ful h-full shadow-lg transition-all duration-300 ease-linear md:hover:-translate-y-4 md:hover:shadow-2xl"
                                        title={blog.title}
                                        content={blog.content}
                                    />
                                </Link>
                            </TiltCard>
                        )
                    })}
            </div>
            {!blogs?.data?.data && blogs.isFetched && (
                <p className="text-destructive">No blogs found</p>
            )}
        </div>
    )
}

export default Home
