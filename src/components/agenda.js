import React, { useState, useEffect } from 'react';
import '../styles/agenda.scss';
import Button from '@mui/material/Button';
import AddAgenda from './subComponents/addAgendaDrawer';
import AgendaTable from './subComponents/agendaTable';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import Swal from 'sweetalert2';
import { CSVLink, CSVDownload } from 'react-csv';
import moment from 'moment';
import { FileDownload } from '@mui/icons-material';
function Agenda() {
	const [ data, setData ] = useState([]);
	const [ drawerFlag, setDrawerFlag ] = useState(false);
	const [ loaderFlag, setLoaderFlag ] = useState(false);
	const agendaModalHandler = () => setDrawerFlag(!drawerFlag);
	useEffect(() => {
		getAgendas();
	}, []);
	function getAgendas() {
		setLoaderFlag(true);
		axios
			.get('https://agenda-test-backend.herokuapp.com/api/allAgendas')
			.then((res) => {
				setData(res.data);
				setLoaderFlag(false);
			})
			.catch((err) => {
				setLoaderFlag(false);
				console.log(err);
			});
	}
	const addData = (dataObj) => {
		setLoaderFlag(true);
		axios
			.post('https://agenda-test-backend.herokuapp.com/api/addAgendas', dataObj)
			.then((res) => {
				getAgendas();
				setLoaderFlag(false);
			})
			.catch((err) => {
				setLoaderFlag(false);
			});
		// setData((data) => [ ...data, dataObj ]);
	};
	const editData = (d, id) => {
		console.log('this is d', d);
		axios
			.put(`https://agenda-test-backend.herokuapp.com/api/editAgendas?id=${id}`, d)
			.then((res) => {
				console.log(res);
				getAgendas();
			})
			.catch((err) => console.log(err));
	};
	const deleteData = (id) => {
		Swal.fire({
			icon: 'warning',
			text: 'Are you sure you want to delete the this agenda?',
			showCancelButton: true,
			cancelButtonText: 'Cancel'
		}).then((result) => {
			if (result.isConfirmed) {
				axios
					.delete(`https://agenda-test-backend.herokuapp.com/api/deleteAgendas?id=${id}`)
					.then((res) => {
						getAgendas();
					})
					.catch((err) => console.log(err));
			}
		});
	};
	const csvData = data.map((i) => {
		return {
			title: i.title,
			description: i.description,
			status: i.status,
			dateTime: moment(i.dateTime).format('llll')
		};
	});
	return (
		<div className="agenda">
			<div className="downloadWrap">
				<CSVLink data={csvData}>
					<FileDownload sx={{ fontSize: 25 }} /> <span>Download CSV</span>
				</CSVLink>
			</div>
			<div className="addBtnWrap">
				<Button onClick={agendaModalHandler} variant="contained">
					Add Agenda
				</Button>
			</div>
			{drawerFlag ? (
				<AddAgenda
					addData={(dataObj) => addData(dataObj)}
					drawerFlag={drawerFlag}
					toggleDrawer={agendaModalHandler}
				/>
			) : null}
			{loaderFlag ? (
				<Box sx={{ width: '100%' }}>
					<LinearProgress />
				</Box>
			) : data && data.length ? (
				<AgendaTable deleteData={deleteData} editData={(dObj, id) => editData(dObj, id)} data={data} />
			) : (
				<h3>No result found</h3>
			)}
		</div>
	);
}

export default Agenda;
