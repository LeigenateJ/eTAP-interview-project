// PostsContext.js

import React, { createContext, useContext, useState, useCallback  } from 'react';

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [selectedBoardId, setSelectedBoardId] = useState(null);
    const [selectedPostId, setSelectedPostId] = useState(null);
    
    const fetchPosts = async (boardId) => {
        try {
            const response = await fetch(`http://localhost/backend/apis/getPosts.php?board_id=${boardId}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const selectBoard = useCallback((boardId) => {
        setSelectedBoardId(boardId);
        fetchPosts(boardId);
    }, [fetchPosts]);

    const postMessage = async (postData) => {
        try {
          const response = await fetch('http://localhost/backend/apis/createPost.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
          });
          if (!response.ok) throw new Error('Network response was not ok');
          fetchPosts(selectedBoardId);
          return await response.json();
        } catch (error) {
          console.error('Error posting message:', error);
          throw error;
        }
    };

    const fetchPostWithReplies = async (postId) => {
      try {
        const response = await fetch(`http://localhost/backend/apis/getPostsWithReplies.php?post_id=${postId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data; 
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    return (
        <PostsContext.Provider value={{ 
          posts, selectedBoardId, 
          selectBoard, postMessage, 
          selectedPostId, setSelectedPostId,
          fetchPostWithReplies }}>
            {children}
        </PostsContext.Provider>
    );
};

export const usePosts = () => useContext(PostsContext);
