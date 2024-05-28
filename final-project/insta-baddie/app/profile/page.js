'use client';

import Nav from '../nav';
import '../globals.css';
import './profile.css';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function Home() {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const supabase = createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();
  
        if (authError) {
          console.error('Error fetching user:', authError.message);
          return;
        }
  
        if (user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('full_name, username, bio')
            .eq('id', user.id)
            .single();
  
          if (error) {
            console.error('Error loading user data:', error.message);
          } else if (data) {
            setFullname(data.full_name);
            setUsername(data.username);
            setBio(data.bio);
          }
  
          const { data: followData, error: followError } = await supabase
            .from('followers')
            .select('*')
            .eq('follower', user.id)
            .eq('followee', data.id)
            .single();
  
          if (followError) {
            console.error('Error checking follow status:', followError.message);
          } else {
            setIsFollowing(followData != null);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };
  
    fetchUserData();
  }, []);
  

  return (
      <main>
        <Nav/> 
        <div className="container">
          <div className="profile-section">
            <div className="profile-header">
              <img src="https://picsum.photos/200/300" alt="Random Image" className="profile-picture" />
              <h1 className="profile-name">{fullname}</h1>
              <p className="profile-username">@{username}</p>
              <p className="profile-bio">{bio}</p>
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