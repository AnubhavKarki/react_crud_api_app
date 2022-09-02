import {
  Typography,
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect} from 'react';

const View = () => {
  const { id } = useParams();
  const [stuInfo, setStuInfo] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    async function getStuInfo(){
      try{
        const info = await axios.get(`http://localhost:3004/students/${id}`);
        setStuInfo(info.data);
      }
      catch(error){
        console.log("Something went wrong!");
      }
    }
    getStuInfo();
  }, [id]);

  return (
    <>
      <Box textAlign={"center"} p={2} backgroundColor="orange">
        <Typography variant="h4">Student Detail</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#616161" }}>
              <TableCell align="center">No.</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
            <TableRow>
              <TableCell align="center">{stuInfo.id}</TableCell>
              <TableCell align="center">{stuInfo.stu_name}</TableCell>
              <TableCell align="center">{stuInfo.email}</TableCell>
            </TableRow>
          }
          </TableBody>
        </Table>
      </TableContainer>
      <Box m={3} textAlign='center'>
        <Button variant='contained' color='primary' onClick={() => {navigate('/')}}>Back to Home</Button>
      </Box>
    </>
  );
};

export default View;
