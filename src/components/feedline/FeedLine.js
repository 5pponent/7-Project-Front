import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { CircularProgress } from '@material-ui/core';
import Feed from './Feed';

export default function FeedLine() {

	const feeds = [
		{
			"feed_seq": "1",
			"content": "Truncation should be conditionally applicable on this long line of text as this is a much longer line than what the container can support.",
			"image": "https://placeimg.com/100/100/people/1",
			"name": "유저1",
			"time": "2022.03.21"
		},
		{
			"feed_seq": "2",
			"content": "Truncation should be conditionally applicable on this long line of text as this is a much longer line than what the container can support.Truncation should be conditionally applicable on this long line of text as this is a much longer line than what the container can support.Truncation should be conditionally applicable on this long line of text as this is a much longer line than what the container can support.",
			"image": "https://placeimg.com/100/100/people/2",
			"name": "유저2",
			"time": "2022.04.05"
		},
		{
			"feed_seq": "3",
			"content": "안고, 그러므로 끓는 곧 어디 얼음과 힘차게 인간이 황금시대다. 때까지 가치를 인생에 밥을 인생의 웅대한 청춘의 그들은 끓는다. 천하를 안고, 피가 사랑의 이것이야말로 있다. 크고 행복스럽고 영락과 철환하였는가? 그러므로 목숨이 설레는 주며, 밝은 철환하였는가? 위하여, 두기 전인 충분히 장식하는 위하여 불어 커다란 이상은 약동하다. 설산에서 이 석가는 커다란 목숨을 않는 예가 운다. 위하여, 고동을 이성은 같으며, 가지에 작고 부패를 것이다. 청춘을 위하여 위하여서, 뭇 얼음과 교향악이다. 트고, 꽃 품었기 굳세게 인생에 뜨고, 청춘을 열락의 자신과 피다.",
			"image": "https://placeimg.com/100/100/people/3",
			"name": "유저3",
			"time": "2022.04.11"
		},
		{
			"feed_seq": "4",
			"content": "Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.",
			"image": "https://placeimg.com/100/100/people/4",
			"name": "유저4",
			"time": "2022.03.01"
		}
	];

	return (
		<>
			<CssBaseline />

			<Box sx={{ bgcolor: '#e7ebf0', minWidth: 800, width: 800, margin: '0 auto' }}>
				{
					feeds ? feeds.map((f) => {
						return (
							<Feed
								key={f.feed_seq}
								content={f.content}
								image={f.image}
								name={f.name}
								time={f.time}
							/>
						);
					}) : 
					<Box display="flex" justifyContent="center" style={{ padding: 50 }}>
						<CircularProgress size={60}></CircularProgress>
					</Box>
				}
				<Box display="flex" justifyContent="center" style={{ padding: 50 }}>
					<CircularProgress size={60}></CircularProgress>
				</Box>
			</Box>
		</>
	);
}