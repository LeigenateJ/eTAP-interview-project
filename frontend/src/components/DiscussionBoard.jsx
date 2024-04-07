import React, { useState } from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Divider, Paper, Box,Button, Dialog, Snackbar , DialogContent  } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { deepPurple } from '@mui/material/colors';
import MuiAlert from '@mui/material/Alert';
import { Pagination, Stack } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { usePosts } from '../contexts/PostsContext';

import CreatePost from './CreatePost';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const DiscussionBoard = ({classroom, boardId, posts}) => {

    const [open, setOpen] = useState(false); 
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const {setSelectedPostId} = usePosts();

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10; // posts num in each page
    const totalPages = Math.ceil(posts.length / postsPerPage);

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    //calculate posts in current page
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const navigate = useNavigate();

    const handlePostClick = (postId) => {
        // Navigate to the post detail page
        setSelectedPostId(postId)
        navigate(`/board/${boardId}/post/${postId}`);
      };

    const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    };

    const handlePostSuccess = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    handleClose();
    };

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


  return (
    
    <Box sx={{ padding: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Typography variant="h4" sx={{fontWeight: 'bold', color: 'rgb(0, 176, 185)'}}>
            Class {classroom} Discussion Board
        </Typography>
        <Button style={{backgroundColor: 'rgb(0, 176, 185)', 
            '&:hover': {
              bgcolor: 'rgb(0, 196, 205)', 
            },
            '&:active': {
              bgcolor: 'rgb(0, 156, 165)'}}} variant="contained" onClick={handleClickOpen}>
            Create New Post
            </Button>
        </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent>
          <CreatePost mode="create" boardId={boardId} handleClose={handleClose} handlePostSuccess={handlePostSuccess} />
        </DialogContent>
      </Dialog>
      <Paper elevation={3}>
        <List>
          {currentPosts.map((post) => (
            <React.Fragment key={post.post_id}>
              <ListItem alignItems="flex-start" onClick={() => handlePostClick(post.post_id)}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: deepPurple[500] }}><ForumIcon /></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={post.title}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        {post.author_name}
                      </Typography>
                      {" — " + post.created_at}
                    </>
                  }
                />
                <ReplyAllIcon sx={{ marginRight: 1 }}/>
                <Typography variant="subtitle2">{post.reply_count} Replys</Typography>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <Stack spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
                <Pagination count={totalPages} page={currentPage} onChange={handleChangePage} />
            </Stack>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            {snackbarMessage}
        </Alert>
        </Snackbar>
    </Box>
  );
};

export default DiscussionBoard;
