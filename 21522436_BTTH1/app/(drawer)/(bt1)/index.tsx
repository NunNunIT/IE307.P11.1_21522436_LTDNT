import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';

import feed from './feed.json';

import PostItem from '~/components/PostItem';

interface Post {
  username: string;
  avt: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  shares: number;
}

const PagePostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setPosts(feed.posts);
  }, []);

  return (
    <View className="flex flex-1 bg-zinc-100 dark:bg-black">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {posts.map((post, index) => (
          <PostItem key={index} post={post} />
        ))}
      </ScrollView>
    </View>
  );
};

export default PagePostList;
