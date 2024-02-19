'use client';

import React from 'react';
import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {useRouter} from 'next/navigation';


import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormLabel,
    FormMessage,
    FormItem
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
    title: z.string().min(1, {
        message: 'Title is Required!'
    }),
})

const CreatePage = () => {
    const {toast} = useToast();
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ''
        }
    });

    /* form look like this {title: string} */

    const { isSubmitting, isValid} = form.formState;

    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post('/api/courses', values);
            router.push(`/teacher/courses/${response.data.id}`)
            toast({
                title: 'Your Course is created!',
                description: 'Sucess adding a course'
            })
        } catch (error) {
            toast({
                variant:'destructive',
                description: "That didn't work"
            })
        }
    }

  return (
    <div className='max-w-5xl mx-auto flex flex-col md:items-center md:justify-center min-h-full p-6'>
        <div className="">
            <h1 className='text-2xl'>
                Name your Course
            </h1>
            <p className='text-sm text-slate-600'>
                What would you like to name your course? Don&aps;t worry you can change it later.
            </p>
            <Form {...form}>
                <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8 mt-8'
                >
                    <FormField 
                        control={form.control}
                        name="title"
                        render={({field})=> (
                            <FormItem>
                                <FormLabel>
                                    Course title
                                </FormLabel>
                                <FormControl>
                                    <Input 
                                    disabled={isSubmitting}
                                    placeholder='e.g. Advance Engineeing'
                                    {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    What will you teach in this Course?
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center gap-x-2">
                        <Link href={'/'}>
                            <Button type='button' variant='ghost'>
                                Cancel
                            </Button>
                        </Link>
                        <Button type='submit' >
                            Continue
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    </div>
  )
}

export default CreatePage