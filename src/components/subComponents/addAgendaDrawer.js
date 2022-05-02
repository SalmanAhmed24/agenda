import React, { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import AgendaForm from './forms/agendaForm';

function AddAgenda({ drawerFlag, toggleDrawer, addData }) {
	return (
		<Drawer className="agendaDrawer" anchor="right" open={drawerFlag} onClose={toggleDrawer}>
			<div className="wraper">
				<h3>Agenda</h3>
				<AgendaForm toggleDrawer={toggleDrawer} addData={(data) => addData(data)} />
			</div>
		</Drawer>
	);
}

export default AddAgenda;
