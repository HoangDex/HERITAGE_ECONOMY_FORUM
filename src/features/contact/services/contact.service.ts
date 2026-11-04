/**
 * LAYER 4: SERVICE CHO MODULE LIÊN HỆ
 */

import { contactRepository } from "../repositories/contact.repository";
import { contactRequestSchema } from "../schemas/contact.schema";
import type { ContactPageData, IContactService } from "../types/contact.types";

export class ContactService implements IContactService {
  async getContactPageData(): Promise<ContactPageData> {
    return contactRepository.getContactPageData();
  }

  async submitContact(
    data: unknown
  ): Promise<{ success: boolean; message: string; trackingCode?: string }> {
    const parsed = contactRequestSchema.safeParse(data);
    if (!parsed.success) {
      const err = parsed.error.issues[0]?.message || "Thông tin không hợp lệ";
      return { success: false, message: err };
    }

    const trackingCode = `HEF-REQ-${Math.floor(10000 + Math.random() * 90000)}`;
    return {
      success: true,
      message:
        "Tiếp nhận thông tin thành công. Ban Thư ký sẽ liên hệ lại với Quý vị trong thời gian sớm nhất.",
      trackingCode,
    };
  }
}

export const contactService = new ContactService();
