// CreatePostComponent.js
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import CloseIcon from '@mui/icons-material/Close';
import 'react-quill/dist/quill.snow.css';
import MuiAlert from '@mui/material/Alert';
import { TextField, Button, Box, DialogContentText, Snackbar, IconButton, DialogActions  } from '@mui/material';
import { useUser } from '../contexts/UserContext';
import { usePosts } from '../contexts/PostsContext';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const CreatePost = ({ mode, boardId, parentPostId = null, handleClose, handlePostSuccess}) => {
  const { userInfo } = useUser();
  const { postMessage } = usePosts();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check empty value
    if (mode === 'create' && !title.trim()) {
        setSnackbarMessage('Title cannot be empty.');
        setSnackbarSeverity('warning');
        setOpenSnackbar(true);
        return;
    } else if (!content.trim()) {
        setSnackbarMessage('Content cannot be empty.');
        setSnackbarSeverity('warning');
        setOpenSnackbar(true);
        return;
    }

    try {
      const postData = {
        board_id: boardId,
        title: mode === 'create' ? title : null,
        author_id: userInfo.user_id,
        author_type: userInfo.user_type,
        content: content,
        parent_post_id: parentPostId,
        root_post_id: null
      };
      console.log(postData)
      const response = await postMessage(postData);
      console.log('create res: ', response)
      if (response) {
        handlePostSuccess('Post created successfully');
      } else {
        setSnackbarMessage('Failed to create the post');
        setSnackbarSeverity('error');
      }
      setOpenSnackbar(true);
      // clear form
      setTitle('');
      setContent('');
    } catch (error) {
      setSnackbarMessage('Failed to create post');
      setSnackbarSeverity('error');
      console.error('Error creating post:', error);
    }
  };

  const handleContentChange = (contentValue) => {
    if (content === 'Enter your post here') {
      setContent('');
    }
    setContent(contentValue);
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    handleClose();
  };

  return (
    <div>
      <DialogContentText sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '25px', color: 'rgb(0, 176, 185)', mb: 2 }}>
        Create New Post
      </DialogContentText>
      <Box component="form" sx={{ '& .MuiTextField-root': { mb: 2 }, padding: 3 }} noValidate autoComplete="off" onSubmit={handleSubmit}>
        {mode === 'create' && (
          <TextField
            id="post-title"
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ marginBottom: 3 }}
          />
        )}
        <ReactQuill theme="snow" value={content} onChange={handleContentChange} style={{ height: '200px', marginBottom: '40px' }} />
        {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleCancel} sx={{ backgroundColor: 'rgb(0, 176, 185)' }}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" sx={{ backgroundColor: 'rgb(0, 176, 185)' }}>
            Submit
          </Button>
        </Box> */}
      </Box>
      <DialogActions sx={{ paddingRight: 3 }}>
        <Button onClick={handleSubmit} style={{ backgroundColor: 'rgb(0, 176, 185)', 
            '&:hover': {
              bgcolor: 'rgb(0, 196, 205)', 
            },
            '&:active': {
              bgcolor: 'rgb(0, 156, 165)'}, color: '#FFFFFF', marginRight: '35px' }} variant="contained">
          Submit
        </Button>
        <Button onClick={handleCancel} sx={{ borderColor: 'rgb(220, 0, 78)', color: 'rgb(220, 0, 78)', '&:hover': { borderColor: 'rgb(220, 0, 78)' } }} variant="outlined">
          Cancel
        </Button>
      </DialogActions>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={() => setOpenSnackbar(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CreatePost;
