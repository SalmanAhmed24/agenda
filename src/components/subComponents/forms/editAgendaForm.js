import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DateTimePicker } from 'react-rainbow-components';
import Button from '@mui/material/Button';
import moment from 'moment';

export default function EditAgendaForm({ editData, actualData, toggleDrawer }) {
	console.log(actualData);
	//  title, description, status, date/time
	const [ status, setStatus ] = useState('pending');
	const [ title, setTitle ] = useState();
	const [ desc, setDesc ] = useState();
	const [ dateTime, setDateTime ] = useState('');
	const [ titleError, setTitleError ] = useState(false);
	const [ statusFlag, setStatusFlag ] = useState(false);
	const [ descFlag, setDescFlag ] = useState(false);
	const [ dateFlag, setDateFlag ] = useState(false);

	// UseEffect
	useEffect(() => {
		setStatus(actualData.status !== null || actualData.status !== undefined ? actualData.status : 'pending');
		setTitle(actualData.title !== null || actualData.title !== undefined ? actualData.title : '');
		setDesc(actualData.description !== null || actualData.description !== undefined ? actualData.description : '');
		setDateTime(actualData.dateTime);
	}, []);
	const handleStatus = (event) => {
		setStatus(event.target.value);
	};
	const dateTimeHandler = (value) => {
		console.log('this is value', value);
		setDateTime(value);
	};
	const handleTitle = (e) => setTitle(e.target.value);
	const handleDesc = (e) => setDesc(e.target.value);
	const editAgenda = () => {
		if (title == '') {
			setTitleError(true);
		}
		if (desc == '') {
			setDescFlag(true);
		}
		if (status == '') {
			setStatusFlag(true);
		}
		if (dateTime == '') {
			setDateFlag(true);
		}
		if (desc !== '' && title !== '' && status !== '' && dateTime !== '') {
			const dataObj = {
				title,
				description: desc,
				status,
				dateTime: new Date(dateTime)
			};
			editData(dataObj, actualData._id);
			toggleDrawer();
		} else {
			return false;
		}
	};
	return (
		<Box
			component="form"
			sx={{
				'& .MuiTextField-root': { m: 1, width: '25ch' }
			}}
			noValidate
			autoComplete="off"
		>
			<div>
				<TextField
					error={titleError}
					id="filled-error"
					helperText={titleError ? 'Please add title' : ''}
					label="Title"
					placeholder="Title"
					variant="filled"
					value={title}
					onChange={handleTitle}
				/>
				<TextField
					error={descFlag}
					id="filled-error-helper-text"
					label="Description"
					placeholder="Description"
					helperText={descFlag ? 'Please add description' : ''}
					variant="filled"
					value={desc}
					onChange={handleDesc}
				/>
				<FormControl sx={{ m: 1, minWidth: 120 }} error>
					<InputLabel id="demo-simple-select-error-label">Status</InputLabel>
					<Select
						labelId="demo-simple-select-error-label"
						id="demo-simple-select-error"
						value={status}
						label="Status"
						error={statusFlag ? true : false}
						onChange={handleStatus}
					>
						<MenuItem value={'active'}>Active</MenuItem>
						<MenuItem value={'pending'}>Pending</MenuItem>
					</Select>
				</FormControl>
				<DateTimePicker
					id="datetimepicker-1"
					label="DateTimePicker"
					value={dateTime}
					onChange={(value) => dateTimeHandler(value)}
					formatStyle="small"
				/>
			</div>
			<div className="addBtnWrap">
				<Button onClick={editAgenda} variant="contained">
					Edit Agenda
				</Button>
			</div>
		</Box>
	);
}
