'use client'

import qs from 'query-string';
import { SearchIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/use-debounce'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const SearchInput = () => {

    const [value, setValue]  = useState('')

    const debounceValue = useDebounce(value)
    const searchParams = useSearchParams();

    const router = useRouter();
    const pathname = usePathname();

    const currentCategoryId = searchParams.get("categoryId");

    useEffect(() => {
        if (value !== '') { // Check if there is some input value
            const url = qs.stringifyUrl({
                url: pathname,
                query: {
                    categoryId: currentCategoryId,
                    title: debounceValue
                }
            });
            router.push(url);
        } else {
            router.push('/search')
        }
    }, [debounceValue, value, currentCategoryId, router, pathname]);
    

    return (
        <div className="relative">
            <SearchIcon
                className='h-4 w-4 absolute top-3 left-3 text-slate-600'
            />
            <Input 
                onChange={(e) => setValue(e.target.value)}
                value={value}
                className='w-full m:w-[300px] pl-9 rounded-lg dark:text-black bg-slate-100 focus-visible:ring-slate-200'
            />
        </div>
    )
}
