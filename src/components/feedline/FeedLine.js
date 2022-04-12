import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Feed from './Feed';

export default function FeedLine() {

	return (
		<React.Fragment>
			<CssBaseline />
			<Container maxWidth="md">
				<Box sx={{ bgcolor: '#e7ebf0', height: '100%', minWidth: 853}}>
					<Feed></Feed>
					<Feed></Feed>
					<Feed></Feed>
					<Feed></Feed>
					<Feed></Feed>
				</Box>
			</Container>
		</React.Fragment>
	);
}