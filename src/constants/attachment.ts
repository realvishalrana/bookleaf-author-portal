/** Attachment rules for new support tickets. */

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
] as const;

export const MAX_ATTACHMENT_SIZE_MB = 5;

export const ATTACHMENT_ACCEPT = "image/jpeg,image/png,image/gif,image/webp";
