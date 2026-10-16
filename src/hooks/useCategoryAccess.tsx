import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkCategoryAccess, ACCESS_DENIED_MESSAGE } from "@/lib/accessControl";
import AccessDeniedModal from "@/components/AccessDeniedModal";

export function useCategoryAccess() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState(ACCESS_DENIED_MESSAGE);
  const [checking, setChecking] = useState(false);

  const openCategory = async (slug: string, level4?: boolean) => {
    setChecking(true);
    const { allowed, message } = await checkCategoryAccess(slug, level4);
    setChecking(false);

    if (!allowed) {
      setModalMessage(message || ACCESS_DENIED_MESSAGE);
      setModalOpen(true);
      return false;
    }

    navigate(`/questions/${slug}`);
    return true;
  };

  const AccessModal = () => (
    <AccessDeniedModal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      message={modalMessage}
    />
  );

  return {
    openCategory,
    checking,
    AccessModal,
    modalOpen,
    setModalOpen,
  };
}
