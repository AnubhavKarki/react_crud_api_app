import { Typography, Box, Grid, TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    stu_name: '',
    email: ''
  });

  useEffect(() => {
    async function getStuInfo(){
      try{ 
        const getInfo = await axios.get(`http://localhost:3004/students/${id}`)
        setStudent(getInfo.data);
      }catch(err){
        console.log("Something went wrong");
      }
    }
    getStuInfo();
  }, [id]);

function handleChange(e){
  setStudent({
      ...student,
      [e.target.name]: e.target.value
    })
  }
  
  async function onFormSubmit(e){
    e.preventDefault();
    try{
      await axios.put(`http://localhost:3004/students/${id}`, student)
      navigate('/')
    }catch(err){
      console.log("Something went wrong!");
    }
  }
  
    return <>
      <Box textAlign='center' p={2} mb={2} backgroundColor='purple' color='white'>
        <Typography variant='h2'>React CRUD with API Call</Typography>
      </Box>
      <Grid container justifyContent='center' spacing={4}>
        <Grid item md={6} xs={12}>
        <Box textAlign='center' p={2} mb={2} backgroundColor='green'>
          <Typography variant='h4'>Edit Student</Typography>
        </Box>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField autoComplete="id" name="id" variant="outlined" required fullWidth id="id" value={student.id} disabled/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField autoComplete='stu_name' name="stu_name" variant="outlined" required fullWidth id="stu_name" autoFocus value={student.stu_name} onChange={(elm) => handleChange(elm)}/>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField autoComplete='email' name="email" variant="outlined" required fullWidth id="email" value={student.email} onChange={elm => handleChange(elm)}/>
            </Grid>
          </Grid>
          <Box m={3}>
            <Button type='button' variant='contained' color='primary' onClick={elm => onFormSubmit(elm)} fullWidth>Update</Button>
          </Box>
        </form>
          <Box m={3} textAlign='center'>
            <Button type='button' variant='contained' color='primary' fullWidth onClick={() => navigate('/')}>Back To Home</Button>
          </Box>
        </Grid>
      </Grid>
    </>
  }
  
export default Edit;