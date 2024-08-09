import { z } from "zod";

export const UserFormValidation = z.object({
    name: z.string()
        .min(2, "Username must be at least 2 characters.")
        .max(35, "Username can not exceed 35 characters."),
    email: z.string().email('Invalid Email'),
    phone: z.string()
    .refine((phone)=> /^\+\d{10,15}$/.test(phone), 'Inavlid Phone Number')

})