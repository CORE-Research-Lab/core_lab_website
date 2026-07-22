import Member from '@/Components/All_Team/Member';
import { members, membersBySlug } from '@/data/members';

export function generateStaticParams() {
  return members.map((person) => ({ member: person.slug }));
}

export async function generateMetadata({ params }) {
  const { member } = await params;
  const person = membersBySlug[member];

  if (!person) {
    return { title: 'Member not found' };
  }

  return {
    title: person.name,
    description: person.bio || `${person.name} — ${person.position}`,
  };
}

export default async function MemberPage({ params }) {
  const { member } = await params;
  return <Member member={member} />;
}
