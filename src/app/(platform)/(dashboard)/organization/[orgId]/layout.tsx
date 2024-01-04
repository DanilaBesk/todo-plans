import { startCase } from 'lodash';
import OrgControl from './_components/org-control';
import { auth } from '@clerk/nextjs';

export async function generateMetadata() {
  const { orgSlug } = auth();
  return {
    title: startCase(orgSlug || 'organization'),
  };
}

type Props = {
  children: React.ReactNode;
};

const OrganizationIdLayout = ({ children }: Props) => {
  console.log('render');

  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default OrganizationIdLayout;
