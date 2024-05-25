'use client';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function FollowButton({ profileId, isInitiallyFollowing }) {
  const [isFollowing, setIsFollowing] = useState(isInitiallyFollowing);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleFollow = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      if (isFollowing) {
        setIsFollowing(false);
        await supabase
          .from('follows')
          .delete()
          .match({ follower_id: user.id, followed_id: profileId });
      } else {
        setIsFollowing(true);
        await supabase
          .from('follows')
          .insert({ follower_id: user.id, followed_id: profileId });
      }
      router.refresh();
    }
  };

  return (
    <button onClick={handleFollow}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
}
