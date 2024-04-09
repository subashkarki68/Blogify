import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

function Paginate({
    page,
    limit,
    setLimit,
    total,
    setPage,
}: {
    page: number
    limit: number
    setLimit: (limit: number) => void
    total: number
    setPage: any
}) {
    const items = []
    const limitItems = []
    const totalPage = Math.ceil(total / limit) || 1

    for (let i = 1; i <= totalPage; i++) {
        items.push(
            <PaginationItem key={i} onClick={() => setPage(i)}>
                <PaginationLink href="#" isActive={page === i}>
                    {i}
                </PaginationLink>
            </PaginationItem>,
        )
    }

    for (let i = 1; i < total / 10; i++) {
        limitItems.push(
            <SelectItem key={i} value={String(i * 10)}>
                {i * 10}
            </SelectItem>,
        )
    }
    return (
        <Pagination>
            <PaginationContent>
                <Select onValueChange={(value) => setLimit(+value)}>
                    <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Limit" />
                    </SelectTrigger>
                    <SelectContent>{limitItems}</SelectContent>
                </Select>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={() =>
                            setPage((prev: number) => Math.max(prev - 1, 1))
                        }
                    />
                </PaginationItem>
                {/* <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem> */}
                {items}
                {/* <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem> */}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={() =>
                            setPage((prev: number) =>
                                Math.min(prev + 1, totalPage),
                            )
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default Paginate
