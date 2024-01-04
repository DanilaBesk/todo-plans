'use client';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useLocalStorage } from 'usehooks-ts';
import { useOrganizationList, useOrganization } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion } from '@/components/ui/accordion';
import { OrganizationType, SidebarItem } from './sidebar-item';

interface SidebarProps {
  storageKey?: string;
}

export const Sidebar = ({ storageKey = 'sidebar-state' }: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );
  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization();
  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });
  const defaultAccordionValue: string[] = Object.keys(expanded).filter(
    (key) => expanded[key]
  );
  // reduce((acc: string[], key: string) => {
  //   if (expanded[key]) {
  //     acc.push(key);
  //   }
  //   return acc;
  // }, []);
  const onExpand = (id: string) => {
    setExpanded((pre) => ({ ...pre, [id]: !expanded[id] }));
  };
  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading)
    return (
      <>
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-10 w-[50%]" />
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <SidebarItem.Skeleton />
          <SidebarItem.Skeleton />
          <SidebarItem.Skeleton />
        </div>
      </>
    );
  return (
    <>
      <div className="font-medium text-xs flex items-center mb-1">
        <span className="pl-4">Workspaces</span>
        <Button
          asChild
          type="button"
          size="icon"
          variant="ghost"
          className="ml-auto"
        >
          <Link href="/select-org">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {userMemberships.data.map(({ organization }) => (
          <SidebarItem
            key={organization.id}
            isActive={activeOrganization?.id === organization.id}
            isExpanded={expanded[organization.id]}
            organization={organization as OrganizationType}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </>
  );
};
