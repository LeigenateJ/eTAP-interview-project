// import React from 'react';
// import { useParams } from 'react-router-dom';
// import {
//   Box,
//   Typography,
//   Paper,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemAvatar,
//   Avatar
// } from '@mui/material';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// // 假设这是你从 API 获取到的帖子数据
// // 注意：实际应用中，你需要使用 useEffect 和 useState 来动态获取和存储这些数据
// const postData = {
//     "post_id": 1,
//     "board_id": 1,
//     "title": "Fractions Discussion",
//     "author_id": 1,
//     "author_type": "teacher",
//     "content": "Let us discuss the concept of fractions.",
//     "created_at": "2024-04-07 21:47:08",
//     "parent_post_id": null,
//     "root_post_id": 1,
//     "author_name": "John Doe",
//     "replies": [
//         {
//             "post_id": 9,
//             "board_id": 1,
//             "title": null,
//             "author_id": 1,
//             "author_type": "caregiver",
//             "content": "I think fractions are interesting.",
//             "created_at": "2024-04-07 21:47:08",
//             "parent_post_id": 1,
//             "root_post_id": 1,
//             "author_name": "Parent 1",
//             "replies": [
//                 {
//                     "post_id": 16,
//                     "board_id": 1,
//                     "title": null,
//                     "author_id": 3,
//                     "author_type": "caregiver",
//                     "content": "Let's have a geography quiz.",
//                     "created_at": "2024-04-07 21:47:08",
//                     "parent_post_id": 9,
//                     "root_post_id": 1,
//                     "author_name": "Parent 3",
//                     "replies": []
//                 }
//             ]
//         },
//         {
//             "post_id": 17,
//             "board_id": 1,
//             "title": null,
//             "author_id": 1,
//             "author_type": "teacher",
//             "content": "This is a test reply3.",
//             "created_at": "2024-04-07 21:47:18",
//             "parent_post_id": 1,
//             "root_post_id": 1,
//             "author_name": "John Doe",
//             "replies": []
//         },
//         {
//             "post_id": 18,
//             "board_id": 1,
//             "title": null,
//             "author_id": 1,
//             "author_type": "teacher",
//             "content": "This is a test reply4.",
//             "created_at": "2024-04-07 21:47:22",
//             "parent_post_id": 1,
//             "root_post_id": 1,
//             "author_name": "John Doe",
//             "replies": []
//         },
//         {
//             "post_id": 19,
//             "board_id": 1,
//             "title": null,
//             "author_id": 1,
//             "author_type": "teacher",
//             "content": "This is a test reply5.",
//             "created_at": "2024-04-07 21:47:25",
//             "parent_post_id": 1,
//             "root_post_id": 1,
//             "author_name": "John Doe",
//             "replies": [
//                 {
//                     "post_id": 20,
//                     "board_id": 1,
//                     "title": null,
//                     "author_id": 1,
//                     "author_type": "teacher",
//                     "content": "This is a test reply6.",
//                     "created_at": "2024-04-07 21:47:41",
//                     "parent_post_id": 19,
//                     "root_post_id": 1,
//                     "author_name": "John Doe",
//                     "replies": [
//                         {
//                             "post_id": 23,
//                             "board_id": 1,
//                             "title": null,
//                             "author_id": 1,
//                             "author_type": "teacher",
//                             "content": "This is a test reply9.",
//                             "created_at": "2024-04-07 21:48:55",
//                             "parent_post_id": 20,
//                             "root_post_id": 1,
//                             "author_name": "John Doe",
//                             "replies": []
//                         },
//                         {
//                             "post_id": 24,
//                             "board_id": 1,
//                             "title": null,
//                             "author_id": 1,
//                             "author_type": "teacher",
//                             "content": "This is a test reply10.",
//                             "created_at": "2024-04-07 21:48:57",
//                             "parent_post_id": 20,
//                             "root_post_id": 1,
//                             "author_name": "John Doe",
//                             "replies": []
//                         }
//                     ]
//                 },
//                 {
//                     "post_id": 21,
//                     "board_id": 1,
//                     "title": null,
//                     "author_id": 1,
//                     "author_type": "teacher",
//                     "content": "This is a test reply7.",
//                     "created_at": "2024-04-07 21:47:45",
//                     "parent_post_id": 19,
//                     "root_post_id": 1,
//                     "author_name": "John Doe",
//                     "replies": []
//                 },
//                 {
//                     "post_id": 22,
//                     "board_id": 1,
//                     "title": null,
//                     "author_id": 1,
//                     "author_type": "teacher",
//                     "content": "This is a test reply8.",
//                     "created_at": "2024-04-07 21:47:48",
//                     "parent_post_id": 19,
//                     "root_post_id": 1,
//                     "author_name": "John Doe",
//                     "replies": []
//                 }
//             ]
//         }
//     ]
// };

// const PostReply = ({ reply }) => {
//   return (
//     <Paper elevation={1} sx={{ my: 2, p: 2 }}>
//       <Typography variant="subtitle1">{reply.author_name} says:</Typography>
//       <Typography variant="body1">{reply.content}</Typography>
//       <Typography variant="caption">{reply.created_at}</Typography>
//       {reply.replies && reply.replies.length > 0 && (
//         <List>
//           {reply.replies.map((subReply) => (
//             <PostReply key={subReply.post_id} reply={subReply} />
//           ))}
//         </List>
//       )}
//     </Paper>
//   );
// };

// const PostDetailPage = () => {
//   // 使用 useParams 获取 URL 参数
//   const { boardId, postId } = useParams();

//   // 实际应用中，你需要在这里发起网络请求获取帖子详情及其回复
  
//   return (
//     <Box sx={{ m: 4 }}>
//       <Typography variant="h4" sx={{ mb: 2 }}>
//         {postData.title}
//       </Typography>
//       <Paper elevation={2} sx={{ p: 2 }}>
//         <ListItem>
//           <ListItemAvatar>
//             <Avatar>
//               <AccountCircleIcon />
//             </Avatar>
//           </ListItemAvatar>
//           <ListItemText primary={postData.content} secondary={`Posted by ${postData.author_name} on ${postData.created_at}`} />
//         </ListItem>
//       </Paper>
//       <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
//         Replies
//       </Typography>
//       <List>
//         {postData.replies.map((reply) => (
//           <PostReply key={reply.post_id} reply={reply} />
//         ))}
//       </List>
//     </Box>
//   );
// };

// export default PostDetailPage;

import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Stack,
  Container,
  CssBaseline,
  IconButton
} from '@mui/material';
import TeacherIcon from '@mui/icons-material/School';
import ParentIcon from '@mui/icons-material/Face';
import ReplyIcon from '@mui/icons-material/Reply';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import Navbar from '../components/Navbar';

import { usePosts } from '../contexts/PostsContext';

const getAvatarIcon = (authorType) => {
  switch (authorType) {
    case 'teacher':
      return <TeacherIcon />;
    case 'caregiver':
      return <ParentIcon/>;
    default:
      return <AccountCircleIcon />;
  }
};

const PostReply = ({ reply }) => {

  return (
    <Paper elevation={5} variant="outlined" sx={{ my: 2, p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar sx={{ bgcolor: reply.author_type === 'teacher' ? '#1976d2' : '#ffa726' }}>
          {getAvatarIcon(reply.author_type)}
        </Avatar>
        <Box flexGrow={1}>
          <Typography variant="subtitle1">{reply.author_name} says:</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {reply.content}
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>{reply.created_at}</Typography>
        </Box>
        <Button variant="contained" startIcon={<ReplyIcon />} size="small" sx={{ bgcolor: 'rgb(0, 176, 185)', 
            '&:hover': {
              bgcolor: 'rgb(0, 196, 205)', 
            },
            '&:active': {
              bgcolor: 'rgb(0, 156, 165)'} }}>Reply</Button>
        <IconButton size="small" sx={{ ml: 1 }}><MoreHorizIcon /></IconButton>
      </Stack>
      {reply.replies && reply.replies.length > 0 && (
        <List sx={{ ml: 4 }}>
          {reply.replies.map((subReply) => (
            <PostReply key={subReply.post_id} reply={subReply} />
          ))}
        </List>
      )}
    </Paper>
  );
};

const PostDetailPage = () => {
  const { fetchPostWithReplies } = usePosts(); 
  const { boardId, postId } = useParams(); 
  const [postDetails, setPostDetails] = useState(null);

  useEffect(() => {
      const fetchPostDetails = async () => {
        const data = await fetchPostWithReplies(postId);
        setPostDetails(data); 
      };
      fetchPostDetails();
    }, [postId, fetchPostWithReplies]);
  

    if (!postDetails) {
      return <Typography>Loading post details...</Typography>;
    }


  return (
    <Box>
    <CssBaseline />
    <Navbar title="Classroom Community" />
    <Box sx={{ bgcolor: 'rgb(199, 231, 235)', pt: 8, px: 23 }}>
        <Container maxWidth="lg" sx={{ bgcolor: '#fff', py: 3, px: 4, boxShadow: 3, mx: 'auto', display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
            <Box sx={{px: 6}}>
          <Typography variant="h4" sx={{ mb: 2, color: 'rgb(0, 176, 185)', fontWeight: 'bold' }}>
            {postDetails.title}
          </Typography>
          <Paper elevation={5} variant="outlined" sx={{ p: 2, mb: 4, borderRadius: 2 }}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: postDetails.author_type === 'teacher' ? '#1976d2' : '#ffa726' }}>
                  {getAvatarIcon(postDetails.author_type)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1" >{postDetails.content}</Typography>} secondary={`Posted by ${postDetails.author_name} on ${postDetails.created_at}`} />
              <Button variant="contained" startIcon={<ReplyIcon />} sx={{ bgcolor: 'rgb(0, 176, 185)', 
            '&:hover': {
              bgcolor: 'rgb(0, 196, 205)', 
            },
            '&:active': {
              bgcolor: 'rgb(0, 156, 165)'}, alignSelf: 'start' }}>Reply to Post</Button>
            </ListItem>
          </Paper>
          <Typography variant="h5" sx={{ mt: 4, mb: 2, color: 'rgb(0, 176, 185)', fontWeight: 'bold' }}>
            Replies
          </Typography>
          <List>
            {postDetails.replies.map((reply) => (
              <PostReply key={reply.post_id} reply={reply} />
            ))}
          </List>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default PostDetailPage;

