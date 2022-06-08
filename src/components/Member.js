import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export default function Member(props) {

	return (
		<TableRow>
			<TableCell>{props.id}</TableCell>
			<TableCell><img src={props.image} alt="profile"></img></TableCell>
			<TableCell>{props.name}</TableCell>
			<TableCell>{props.birthday}</TableCell>
			<TableCell>{props.gender}</TableCell>
			<TableCell>{props.job}</TableCell>
		</TableRow>
	)
}