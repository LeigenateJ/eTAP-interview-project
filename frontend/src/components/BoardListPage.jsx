import React, { useState, useEffect } from 'react';
import {
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Button,
  Box,
  Container,
  CssBaseline,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import Navbar from './Navbar';

import DiscussionBoard from './DiscussionBoard';

import { useUser } from '../contexts/UserContext';
import { usePosts } from '../contexts/PostsContext';


const BoardListPage = ({ onLogout }) => {
    const { userInfo } = useUser();
    const { posts, selectedBoardId, selectBoard } = usePosts();
    const [selectedClass, setSelectedClass] = useState('');

    useEffect(() => {
        if (userInfo.details.length > 0 && !selectedBoardId) {
            const sortedClasses = userInfo.details.sort((a, b) => a.class_name.localeCompare(b.class_name));
            const firstBoardId = sortedClasses[0].discussion_board.board_id;
            setSelectedClass(sortedClasses[0].class_name);
            selectBoard(firstBoardId);
        }
    }, [userInfo.details, selectedBoardId, selectBoard]);

    const handleClassClick = (boardId, className) => {
        selectBoard(boardId);
        setSelectedClass(className);
    };

  if (userInfo.details.length === 0) {
    return (
        <Box>
        <CssBaseline />
        <Navbar title="Classroom Community" />
        <Box sx={{ display: 'flex' , justifyContent: 'center', textAlign: 'center', alignItems: 'center', height: '100vh'}}>
            <Typography variant="h5" sx={{fontWeight: 'bold', fontSize: '40px', color: 'rgb(0, 176, 185)'}}>
              No any class you can access!
            </Typography>
        </Box>
      </Box>
    );
  }

  const drawerWidth = 240;

    const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap>
          eTAP
        </Typography>
      </Toolbar>
      <Divider />
      <List>
      {userInfo.details.map((detail) => (
          <ListItem button key={detail.classroom_id} 
            onClick={() => handleClassClick(detail.discussion_board.board_id, detail.class_name)}
            selected={selectedBoardId === detail.discussion_board.board_id}
            sx={{
                '&.Mui-selected': {
                    backgroundColor: 'rgba(0, 0, 0, 0.08)',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.12)',
                    },
                },
            }}
            >
            <ListItemIcon><SchoolIcon /></ListItemIcon>
            <ListItemText primary={'Class ' + detail.class_name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar title="Classroom Community" />
      <Drawer
        variant="persistent"
        sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
        open
      >
        {drawer}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Container maxWidth="lg" sx={{ marginLeft: '250px'}}>
          <Typography paragraph sx={{ fontSize: '40px', fontWeight: 'bold', color: 'rgb(0, 176, 185)'}}>
            Welcome to Your Classroom Community!
          </Typography>
          <DiscussionBoard classroom={selectedClass} boardId={selectedBoardId} posts={posts}/>
        </Container>
      </Box>
    </Box>
  );
};

export default BoardListPage;
