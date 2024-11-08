// 21522436 - Nguyễn Thị Hồng Nhung
import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Pressable, useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Text } from '../ui/text';

interface Post {
  username: string;
  avt: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  shares: number;
}

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const colorScheme = useColorScheme();
  const [likes, setLikes] = useState<number>(post.likes);
  const [selectedEmotion, setSelectedEmotion] = useState<string>('default');
  const [comments, setComments] = useState<number>(post.comments);
  const [shares, setShares] = useState<number>(post.shares);
  const [showEmotions, setShowEmotions] = useState<boolean>(false);

  const emotionColors: { [key: string]: { label: string; color: string; icon: string } } = {
    default: {
      label: 'Like',
      color: colorScheme === 'dark' ? 'gray' : 'gray',
      icon: 'thumbs-up',
    },
    like: {
      label: 'Like',
      color: colorScheme === 'dark' ? '#3b82f6' : '#2563eb',
      icon: 'thumbs-up',
    },
    love: { label: 'Love', color: colorScheme === 'dark' ? '#f43f5e' : '#e11d48', icon: 'heart' },
    haha: { label: 'Haha', color: colorScheme === 'dark' ? '#fde047' : '#facc15', icon: 'laugh' },
    sad: { label: 'Sad', color: colorScheme === 'dark' ? '#fb923c' : '#f97316', icon: 'sad-tear' },
    angry: { label: 'Angry', color: colorScheme === 'dark' ? '#ef4444' : 'red', icon: 'angry' },
  };

  const handleLikePress = () => {
    if (selectedEmotion !== 'default') {
      // Bỏ chọn emotion hiện tại (giảm 1 like)
      setSelectedEmotion('default');
      setLikes((prev) => prev - 1);
    } else {
      // Chọn emotion mặc định (tăng 1 like)
      handleSelectEmotion('like');
    }
  };

  const handleSelectEmotion = (emotion: string) => {
    if (selectedEmotion === emotion) {
      // Bỏ chọn emotion (giảm 1 like)
      setSelectedEmotion('default');
      setLikes((prev) => prev - 1);
    } else {
      if (selectedEmotion === 'default') {
        // Thả emotion lần đầu tiên (tăng 1 like)
        setLikes((prev) => prev + 1);
      }
      setSelectedEmotion(emotion);
    }
    setShowEmotions(false);
  };

  const handleCommentPress = () => {
    setComments((prev) => prev + 1);
  };

  const handleSharePress = () => {
    setShares((prev) => prev + 1);
  };

  const handleLongPress = () => {
    setShowEmotions(true);
  };

  // 21522436 - Nguyễn Thị Hồng Nhung
  return (
    <View className="mb-4 bg-white py-4 dark:bg-zinc-900">
      {/* User Info */}
      <View className="mb-2 flex flex-row gap-3 px-3">
        <Image source={{ uri: post.avt }} className="aspect-square h-10 rounded-lg object-cover" />
        <Text className="mb-2 text-lg font-semibold text-zinc-600 dark:text-zinc-300">
          {post.username}
        </Text>
      </View>

      {/* Post Content */}
      <Text className="mb-2 px-3 text-zinc-900 dark:text-zinc-100">{post.content}</Text>

      {/* Post Image */}
      {post.imageUrl && (
        <Image source={{ uri: post.imageUrl }} className="aspect-[4/3] w-full object-cover" />
      )}

      {/* Reactions */}
      <View className="mb-4 flex-row items-center justify-between px-3 py-1 text-sm">
        <View className="flex flex-row items-center justify-center gap-1">
          <View className="flex items-center justify-center rounded-full bg-blue-600 p-1 dark:bg-blue-600">
            <Icon name="thumbs-up" size={11} color="white" />
          </View>
          <Text className="text-zinc-600 dark:text-zinc-300">{likes}</Text>
        </View>
        <View className="flex-row gap-3">
          <Text className="text-zinc-600 dark:text-zinc-300">{comments} Comments</Text>
          <Text className="text-zinc-600 dark:text-zinc-300">{shares} Shares</Text>
        </View>
      </View>

      <View className="flex flex-row flex-nowrap justify-between gap-3 px-3">
        {/* Likes */}
        <TouchableOpacity
          className="w-1/4 flex-row items-center"
          onPress={handleLikePress}
          onLongPress={handleLongPress}>
          <Icon
            name={emotionColors[selectedEmotion].icon}
            size={20}
            color={emotionColors[selectedEmotion].color}
            style={{ marginRight: 8 }}
          />
          <Text style={{ color: emotionColors[selectedEmotion].color }}>
            {emotionColors[selectedEmotion].label}
          </Text>
        </TouchableOpacity>

        {/* Emotion Selection Bar */}
        {showEmotions && (
          <View className="absolute -top-16 left-3 flex-row gap-3 rounded-2xl bg-zinc-100 p-2 px-3 shadow-lg dark:bg-zinc-800">
            {Object.keys(emotionColors)
              .slice(1, 6)
              .map((emotion) => (
                <Pressable key={emotion} onPress={() => handleSelectEmotion(emotion)}>
                  <Icon
                    name={emotionColors[emotion].icon}
                    size={32}
                    color={emotionColors[emotion].color}
                  />
                </Pressable>
              ))}
          </View>
        )}

        {/* Comments */}
        <TouchableOpacity className="flex-row items-center" onPress={handleCommentPress}>
          <Icon
            name="comment"
            size={20}
            color={colorScheme === 'dark' ? 'gray' : 'gray'}
            style={{ marginRight: 8 }}
          />
          <Text className="text-gray-600 dark:text-zinc-600">Comments</Text>
        </TouchableOpacity>

        {/* Shares */}
        <TouchableOpacity className="flex-row items-center" onPress={handleSharePress}>
          <Icon
            name="share"
            size={20}
            color={colorScheme === 'dark' ? 'gray' : 'gray'}
            style={{ marginRight: 8 }}
          />
          <Text className="text-gray-600 dark:text-zinc-600">Shares</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostItem;
