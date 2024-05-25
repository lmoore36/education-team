'use client';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function FollowButton({ profileId, isInitiallyFollowing }) {
  const [isFollowing, setIsFollowing] = useState(isInitiallyFollowing);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleFollow = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching user:', error.message);
        return;
      }

      if (user) {
        if (isFollowing) {
          setIsFollowing(false);
          await supabase
            .from('followers')
            .delete()
            .match({ follower: user.id, followee: profileId });
        } else {
          setIsFollowing(true);
          await supabase
            .from('followers')
            .insert({ follower: user.id, followee: profileId });
        }
        router.refresh();
      }
    } catch (error) {
      console.error('Error handling follow:', error.message);
    }
  };

  console.log('isFollowing:', isFollowing);

  return (
    <button onClick={handleFollow}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
}
