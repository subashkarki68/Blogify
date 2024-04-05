import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'

interface BlogCardProps {
    title: string
    content: string
    className?: string
}

function BlogCard({ title, content, className = '' }: BlogCardProps) {
    const [isCardHovered, setIsCardHovered] = useState(false)
    return (
        <Card
            className={`${className} cursor-pointer`}
            onMouseOver={() => setIsCardHovered(true)}
            onMouseLeave={() => setIsCardHovered(false)}
        >
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{content}</CardContent>
            <CardFooter className="flex flex-row items-baseline">
                <span className="w-full">
                    Read More
                    <div
                        className={`h-1 w-2 rounded-3xl bg-destructive shadow-2xl transition-all duration-700 ${isCardHovered ? 'w-[80%] bg-destructive' : ''}`}
                    ></div>
                </span>
            </CardFooter>
        </Card>
    )
}

export default BlogCard
