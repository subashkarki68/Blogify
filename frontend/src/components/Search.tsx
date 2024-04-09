import { URLS } from '@/constants'
import useDebounce from '@/hooks/useDebounce'
import { axiosInstance } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from './ui/card'
import { Input } from './ui/input'

function Search() {
    const [search, setSearch] = useState('')
    const [term] = useDebounce(search, 500)
    const { GET_PUBLISHED_BLOGS } = URLS

    const { data, isLoading } = useQuery({
        queryKey: ['blogs', term],
        queryFn: () =>
            axiosInstance
                .get(GET_PUBLISHED_BLOGS + `?title=${term}`)
                .then((res) => res.data.data),
    })
    return (
        <>
            <div className="relative">
                <Input
                    placeholder="Search blog title..."
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {isLoading && (
                    <LoaderCircle className="absolute right-2 top-1/3 h-5 w-5 animate-spin" />
                )}
                <div className="shadow-3xl absolute z-50 w-[60vw] rounded-2xl bg-secondary text-secondary-foreground">
                    {search && data?.data?.length < 1 && (
                        <div className="m-5 text-destructive">
                            No results found
                        </div>
                    )}
                    {search &&
                        data?.data?.length >= 1 &&
                        data?.data?.map((b: any) => {
                            return (
                                <Card className="m-5 cursor-pointer bg-secondary text-secondary-foreground shadow transition-all duration-500 ease-linear hover:shadow-2xl">
                                    <CardHeader>
                                        <CardTitle>{b.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription>
                                            {b.content.slice(0, 200) + '...'}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            )
                        })}
                </div>
            </div>
        </>
    )
}

export default Search
