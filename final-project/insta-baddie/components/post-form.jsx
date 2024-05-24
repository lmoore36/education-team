import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function PostForm({ user }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [likeCount, setLikeCount] = useState(0); // Assuming default is 0

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.from('posts').upsert({
        text,
        like_count: likeCount,
        user_id: user?.id,
      });
      if (error) {
        throw error;
      }
      alert('Post created!');
    } catch (error) {
      console.error('Error creating post:', error.message);
      alert('Error creating post!');
    } finally {
      setLoading(false);
    }
  };

  const getPosts = useCallback(async () => {
    try {
      setLoading(true);
      // Fetch posts if needed
    } catch (error) {
      console.error('Error loading posts:', error.message);
      alert('Error loading posts!');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <main>
      <div className="container">
        <div className="form-widget">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="text">Text/Caption:</label>
              <input
                id="text"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="likeCount">Like Count:</label>
              <input
                id="likeCount"
                type="number"
                value={likeCount}
                onChange={(e) => setLikeCount(Number(e.target.value))}
              />
            </div>
            <button
              className="button primary block"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Loading ...' : 'Create Post'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}