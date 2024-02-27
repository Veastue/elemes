'use client'

import React from 'react'
import { Card } from './ui/card';

import {
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis
} from 'recharts'


interface ChartProps {
    data: {
        name: string;
        total: number;
    }[]
}

const Chart = ({
    data
}: ChartProps) => {
  return (
    <Card className=' pt-6'>
        <ResponsiveContainer width='100%' height={350}>
            <BarChart data={data}>
                <XAxis 
                    dataKey='name'
                    stroke="#888888"
                    fontSize='12'
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis 
                    stroke='#888888'
                    fontSize='12'
                    tickLine={false}
                    axisLine={false}
                />
                <Bar
                    dataKey='total'
                    fill='#E94A60'
                    radius={[15, 15, 0, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    </Card>
  )
}

export default Chart