'use client';

import React, { useState } from 'react';
import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';


interface TitleFormProps {
    initialData: {
        title: string;
    };
    courseId: string;
}

const formSchema = z.object({
    title: z.string().min(1,{
        message: 'Title is required'
    }),
});

const TitleForm = ({initialData, courseId}: TitleFormProps) => {
    const {toast} = useToast();
    const router =  useRouter();
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const { isSubmitting, isValid} = form.formState;

    //api calls
    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
            toast({
                title: 'Sucess',
                description: 'Course Updated'
            })
            toggleEdit;
            router.refresh();
        } catch(error) {
            toast({
                variant: 'destructive',
                description: "Something didn't work out! "
            })
        }
    }


  return (
    <div className='mt-6 border rounded-md p-4'>
        
        <div className="font-medium flex items-center justify-between">
            Course Title
            <Button variant='ghost' onClick={toggleEdit}>
                {isEditing ? (
                    <>Cancel</>
                ): 
                    <>
                        <Pencil className='h-4 w-4 mr-2'/>
                        Edit Title
                    </>
                }
            </Button>
        </div>
        {!isEditing && (
            <p className="text-2xl font-medium">
                {initialData.title}
            </p>
        )}
        {isEditing && (
            <Form
            {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-4 mt-4'
                >
                    <FormField 
                        control={form.control}
                        name='title'
                        render = {({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        disabled={isSubmitting}
                                        placeholder="e.g. 'Structural Engineering'"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='flex items-center gap-x-2'>
                        <Button 
                            disabled={!isValid || isSubmitting}
                            type="submit"
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </Form>
        )}
    </div>
  )
}

export default TitleForm