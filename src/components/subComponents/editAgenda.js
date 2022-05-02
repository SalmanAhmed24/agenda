import React, { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import EditAgendaForm from './forms/editAgendaForm';

function EditAgenda({ drawerFlag, toggleDrawer, editData, actualData }) {
	return (
		<Drawer className="agendaDrawer" anchor="right" open={drawerFlag} onClose={toggleDrawer}>
			<div className="wraper">
				<h3>Edit Agenda</h3>
				<EditAgendaForm
					actualData={actualData}
					toggleDrawer={toggleDrawer}
					editData={(data, id) => editData(data, id)}
				/>
			</div>
		</Drawer>
	);
}

export default EditAgenda;
