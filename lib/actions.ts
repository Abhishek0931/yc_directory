"use server"

import { auth } from "@/auth";
import slugify from "slugify";
import { parseServerActionRespose } from "./utils";
import { writeClient } from "@/sanity/lib/write-client";

console.log("createPitch called");

export const createPitch = async (state: any, form: FormData, pitch: string) => {
    const session = await auth();

    if(!session) return parseServerActionRespose({ 
        error: 'not signed in', 
        status: 'ERROR'
    });

    const {title, description, category, link} = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== 'pitch'),
    );

    const slug = slugify(title as string, { lower: true, strict: true});
    console.log("Slug value:", slug);
    if (!slug) {
        console.error("Slug is empty. Startup will not be shown.");
        return parseServerActionRespose({
            error: 'Slug is empty. Startup will not be shown.',
            status: 'ERROR'
        });
    }

    try {
        const startup = {
            title,
            description,
            category,
            image: link,
            slug: {
                _type: "slug",
                current: slug,
            },
            author: {
                _type: 'reference',
                _ref: session?.id,
            },
            pitch,
        };

        const result = await writeClient.create({ _type: 'startup', ...startup });

        return parseServerActionRespose({
            ...result,
            error: '',
            status: 'SUCCESS',
        });

    } catch(error) {
        console.log(error);

        return parseServerActionRespose({
            error: JSON.stringify(error),
            status: 'ERROR'
        });
    }
};