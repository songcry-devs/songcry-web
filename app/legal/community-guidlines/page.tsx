import { redirect } from 'next/navigation'

// Preserve backwards compat with Framer URL typo: community-guidlines → community-guidelines
export default function CommunityGuidlinesRedirect() {
  redirect('/legal/community-guidelines')
}
