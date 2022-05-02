import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment';
import '../../styles/agendaTable.scss';
import EditAgenda from './editAgenda';
function AgendaTable({ data, editData, deleteData }) {
	const [ userId, setUserId ] = useState(null);
	const [ actionFlag, setActionFlag ] = useState(false);
	const [ drawerFlag, setDrawerFlag ] = useState(false);
	const userIdHandler = (id) => {
		setUserId(id);
		setActionFlag(!actionFlag);
	};
	const editDrawerHandler = () => {
		setDrawerFlag(!drawerFlag);
		setActionFlag(false);
	};
	return (
		<TableContainer className="tableMain" component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Title</TableCell>
						<TableCell>Description</TableCell>
						<TableCell>Status</TableCell>
						<TableCell>Time/Date</TableCell>
						<TableCell>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data &&
						data.map((row) => (
							<TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<TableCell component="th" scope="row">
									{row.title}
								</TableCell>
								<TableCell>{row.description}</TableCell>
								<TableCell>{row.status}</TableCell>
								<TableCell>{moment(row.dateTime).format('lll')}</TableCell>
								<TableCell className="actionCol">
									<MoreVertIcon
										className="menuAct"
										onClick={() => userIdHandler(row._id)}
										sx={{ fontSize: 25 }}
									/>
									{actionFlag && userId == row._id ? (
										<div className="dropdown">
											<p onClick={() => editDrawerHandler()}>Edit</p>
											<p onClick={() => deleteData(row._id)}>Delete</p>
										</div>
									) : null}
								</TableCell>
								{drawerFlag && userId == row._id ? (
									<EditAgenda
										editData={(data, id) => editData(data, id)}
										drawerFlag={drawerFlag}
										actualData={row}
										toggleDrawer={editDrawerHandler}
									/>
								) : null}
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default AgendaTable;
