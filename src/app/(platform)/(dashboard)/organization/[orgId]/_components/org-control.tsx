'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useOrganizationList } from '@clerk/nextjs';

const OrgControl = () => {
  const params = useParams<{ orgId: string }>();
  const { setActive } = useOrganizationList();

  useEffect(() => {
    if (!setActive) return;
    setActive({
      organization: params.orgId,
    });
  }, [params.orgId, setActive]);
  return null;
};

export default OrgControl;
