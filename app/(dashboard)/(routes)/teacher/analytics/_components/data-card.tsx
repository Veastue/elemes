import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { formatPrice } from '@/lib/format';
import React from 'react'

interface DataCardProps {
    value: number;
    label: string;
    shouldFormat?: boolean
}

const DataCard = ({
    value,
    label,
    shouldFormat
}: DataCardProps) => {
  return (
    <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            {label}
        </CardHeader>
        <CardContent >
            <div>
                {shouldFormat ? formatPrice(value) : value}
            </div>
        </CardContent>
    </Card>
  )
}

export default DataCard