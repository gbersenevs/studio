"use server";

import { z } from "zod";
import { sendLeadToTelegram } from "@/src/lib/telegram";

export type LeadFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string[]>;
};

const leadSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  cityOfInterest: z.enum(["Riga", "Palanga", "Both"]),
  contactChannel: z.enum(["email", "whatsapp", "telegram"]),
  message: z.string().max(800, "Message is too long").optional(),
  agree: z.literal("on", {
    errorMap: () => ({ message: "You must agree to be contacted" }),
  }),
  listingSlug: z.string().optional(),
});

export async function submitLead(
  _prevState: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const raw = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    cityOfInterest: formData.get("cityOfInterest"),
    contactChannel: formData.get("contactChannel"),
    message: formData.get("message") || undefined,
    agree: formData.get("agree"),
    listingSlug: formData.get("listingSlug") || undefined,
  };

  const parsed = leadSchema.safeParse(raw);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return {
      status: "error",
      message: "Please review the highlighted fields.",
      errors,
    };
  }

  const data = parsed.data;

  await sendLeadToTelegram({
    fullName: data.fullName,
    email: data.email,
    phone: data.phone as string | undefined,
    cityOfInterest: data.cityOfInterest,
    contactChannel: data.contactChannel,
    message: data.message,
    listingSlug: data.listingSlug,
  });

  return {
    status: "success",
    message: "Thanks for reaching out. We will contact you shortly.",
  };
}
