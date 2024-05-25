'use client';

import Nav from '../nav';
import '../globals.css';
import './profile.css';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import FollowButton from '@/lib/actions/following'; // Adjust the path as necessary

export default function ProfilePage() {
  const { username } = useParams(); // Get the dynamic username from the route
  const [fullname, setFullname] = useState('');
  const [bio, setBio] = useState('');
  const [profileId, setProfileId] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const supabase = createClient();
      const { data: user, error: userError } = await supabase
        .from('profiles')
        .select('full_name, bio, id')
        .eq('username', username)
        .single();

      if (userError) {
        console.error('Error loading user data:', userError.message);
      } else if (user) {
        setFullname(user.full_name);
        setBio(user.bio);
        setProfileId(user.id);
      }
    };

    if (username) {
      fetchUserData();
    }
  }, [username]);

  return (
    <main>
      <Nav />
      <div className="container">
        <div className="profile-section">
          <div className="profile-header">
            <img src="https://picsum.photos/200/300" alt="Random Image" className="profile-picture" />
            <h1 className="profile-name">{fullname}</h1>
            <p className="profile-username">@{username}</p>
            <p className="profile-bio">{bio}</p>
            {profileId && <FollowButton profileId={profileId} />}
          </div>

          <div className="profile-stats">
            <div>
              <h2>Tweets</h2>
              <p>100</p>
            </div>
            <div>
              <h2>Following</h2>
              <p>50</p>
            </div>
            <div>
              <h2>Followers</h2>
              <p>200</p>
            </div>
          </div>

          <div className="profile-timeline">
            {/* Replace with actual tweets */}
            <div className="tweet">
              <p>This is a tweet!</p>
              <p className="tweet-date">1 hour ago</p>
            </div>
            <div className="tweet">
              <p>Another tweet here.</p>
              <p className="tweet-date">2 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
