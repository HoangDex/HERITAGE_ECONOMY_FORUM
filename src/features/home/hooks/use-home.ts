/**
 * LAYER 6A: REACT CLIENT HOOK CHO MODULE HOME
 * Quản lý trạng thái form nhận tin, chuyển đổi tab và tương tác trang chủ
 */

"use client";

import { useState, useTransition } from "react";
import { subscribeNewsletterAction } from "../actions/home.actions";

export function useHome() {
  const [isPending, startTransition] = useTransition();
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubscribeStatus("idle");
    setStatusMessage("");

    const formData = new FormData(e.currentTarget);
    const formElement = e.currentTarget;

    startTransition(async () => {
      const res = await subscribeNewsletterAction(formData);
      if (res.success) {
        setSubscribeStatus("success");
        setStatusMessage(res.message || "Đăng ký thành công!");
        formElement.reset();
      } else {
        setSubscribeStatus("error");
        setStatusMessage(res.error || "Có lỗi xảy ra, vui lòng thử lại.");
      }
    });
  };

  return {
    isPending,
    subscribeStatus,
    statusMessage,
    handleSubscribe,
  };
}
