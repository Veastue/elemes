import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import Stripe from "stripe";

export async function POST(
    req: Request,
    { params } : {params: {courseId: string}}
) {
    try {
        const user =  await currentUser();
        if(!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
            return new NextResponse('Unauthorized', {status : 401})
        }

        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
                isPublished: true
            }
        });

        const purchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId: user.id,
                    courseId: params.courseId
                }
            }
        })

        if (purchase) {
            return new NextResponse('Already purchased', {status: 400})
        }

        if(!course) {
            return new NextResponse('Not Found', {status: 404})
        }

        //Stripe Model
        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
            {
                quantity: 1,
                price_data: {
                    currency: "USD",
                    product_data:{
                        name: course.title,
                        description: course.description!,
                    },
                    unit_amount: Math.round(course.price! * 100)
                }
            }
        ];

        //Check our databse for stripe customer data

        let stripeCustomer = await db.stripeCustomer.findUnique({
            where: {
                userId: user.id
            },
            select: {
                stripeCustomerId: true
            }
        })

        if (!stripeCustomer) {
            const customer = await stripe.customers.create({
                email: user.emailAddresses[0].emailAddress,
            })


            stripeCustomer = await db.stripeCustomer.create({
                data: {
                    userId: user.id,
                    stripeCustomerId: customer.id
                }
            })
        }

        //on checkout session
        const session = await stripe.checkout.sessions.create({
            customer: stripeCustomer.stripeCustomerId,
            line_items,
            mode: 'payment',
            success_url: `${process.env.Next_PUBLIC_APP_URL}/courses/${course.id}?sucess=1`,
            cancel_url: `${process.env.Next_PUBLIC_APP_URL}/courses/${course.id}?cancel=1`,
            //throws a notif regarding the transaction sucess and information about what data went through
            metadata: {
                courseId: course.id,
                userId: user.id
            }
        })

        return NextResponse.json({url: session.url})

    } catch (error) {
        console.log("[COURSE_ID_CHECKOUT]", error)
        return new NextResponse('Internal Error', {status: 500})
    }
}