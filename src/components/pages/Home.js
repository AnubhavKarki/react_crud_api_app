import {Typography, Box, Grid, TextField, Button} from '@mui/material';
import List from '../pages/List';
import axios from 'axios';
import { useState } from 'react';

const Home = () => {
    const [ student, setStudent ] = useState([]);
    const [status, setStatus] = useState();

    function onTextFieldChange(e){
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        })
    }
    async function onFormSubmit(e){
        e.preventDefault();
        try{
            await axios.post(`http://localhost:3004/students/`, student);
            setStatus(true);

        }catch(err){
            console.log("Error has occurred");
        }
    }
    
if(status === true){
  return <Home /> 
}
  return <>
  <Box textAlign={'center'} backgroundColor='purple' color='white' p={2} mb={2}>
    <Typography variant='h2'>React CRUD with API Call</Typography>
  </Box>
  <Grid container justify='center' spacing={3}>
    <Grid item md={6} xs={12}>
        <Box textAlign='center' p={2} mb={2} backgroundColor='green'>
            <Typography variant='h4'>Add Student</Typography>
        </Box>
        <form noValidate>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField autoComplete="stuName" onChange={(elm) => onTextFieldChange(elm)} name="stu_name" variant="outlined" required fullWidth id="stuName" label="Name"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField autoComplete="email" onChange={(elm) => onTextFieldChange(elm)} name="email" variant="outlined" required fullWidth id="email" label="Email Address"/>
                </Grid>
            </Grid>
            <Box m={3}>
                <Button type="submit" variant="contained" color="primary" onClick={(elm) => onFormSubmit(elm)} fullWidth>Add</Button>
            </Box>
        </form>
    </Grid>
    <Grid item md={6} xs={12}>
        <List/>
    </Grid>
  </Grid>
  </>
}

export default Home;