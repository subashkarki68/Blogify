import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'

interface BlogStatusProps {
    className?: string
    status: 'published' | 'draft'
    onStatusChange: any
    slug: string
}

const BlogStatus = ({
    className = '',
    status = 'draft',
    onStatusChange,
    slug,
}: BlogStatusProps) => {
    const [publishedStatus, setPublishedStatus] = useState(
        status === 'published',
    )
    const handleCheck = (checked: boolean) => {
        setPublishedStatus(checked)
        console.log('checked', checked)
        onStatusChange(slug, checked ? 'published' : 'draft')
    }
    return (
        <div className={className}>
            <div className="flex items-center space-x-2">
                <Label htmlFor="blog-status" id="draft">
                    Draft
                </Label>
                <Switch
                    id="blog-status"
                    checked={publishedStatus}
                    onCheckedChange={handleCheck}
                />
                <Label htmlFor="blog-status" id="Published">
                    Published
                </Label>
            </div>
        </div>
    )
}

export default BlogStatus
