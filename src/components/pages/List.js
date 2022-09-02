import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Typography,
  Box
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';


const List = () => {
    const [student, setStudent] = useState([]);
    useEffect(() => {
        getAllStudent();
    }, [])
    async function getAllStudent(){
        try{
            const students = await axios.get("http://localhost:3004/students");
            // console.log(students.data);
            setStudent(students.data);
        }catch(err){
            console.log("Error has occurred");
        }
    }
    const handleDelete = async id_ => {
      try{
        await axios.delete(`http://localhost:3004/students/${id_}`);
        var newStudent = student.filter(elm => {
          return elm.id !== id_;
        })
        setStudent(newStudent);
      }
      catch{
        console.log("Something Went Wrong");
      }
    }

    // async function handleDelete(id_){
    //   await axios.delete(`http://localhost:3004/students/${id_}`);
    //   var newStudentList = student.filter(item => {
    //     return item.id !== id_;
    //   })
    //   setStudent(newStudentList);
    // }
  return (
    <>
      <Box textAlign={"center"} p={2} backgroundColor="orange">
        <Typography variant="h4">Student List</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#616161" }}>
              <TableCell align="center">No.</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
            student.map((elm, ind)=>{
                return(
            <TableRow key={ind}>
              <TableCell align="center">{ind+1}</TableCell>
              <TableCell align="center">{elm['stu_name']}</TableCell>
              <TableCell align="center">{elm["email"]}</TableCell>
              <TableCell align="center">
                <Tooltip title="View">
                  <IconButton>
                    <Link to={`/view/${elm.id}`}>
                      <VisibilityIcon color="primary" />
                    </Link>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton>
                    <Link to={`/edit/${elm.id}`}>
                      <EditIcon color="secondary" />
                    </Link>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => handleDelete(elm.id)}>
                    <DeleteIcon color="error"/>
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
            )
            })
          } 
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default List;
