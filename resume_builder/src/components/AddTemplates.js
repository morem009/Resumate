import React,{useState} from 'react'
import AdminDrawer from './AdminDrawer'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from "@mui/material/Link";
// Import the main component
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library


function Copyright(props) {
  return (
    <>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Resumate
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </>
  );
}

const mdTheme = createTheme();

function AddTemplates(props) {
   // Create new plugin instance
   const defaultLayoutPluginInstance = defaultLayoutPlugin();
  
   // for onchange event
   const [file, setFile] = useState(null);
 
   // for submit event
   const [viewPdf, setViewPdf]=useState('');
 
   // onchange event
   const fileType=['application/pdf'];

  const handlePdfFileChange=(e)=>{
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    // console.log(file)
    if(selectedFile){
      if(selectedFile&&fileType.includes(selectedFile.type)){
        let reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = (e) =>{
              setViewPdf(e.target.result);
            }
      }
    }
    else{
      console.log('select your file');
    }
  }

const onSave = async (event) =>{
  event.preventDefault();
  console.log(file);
  const formData = new FormData();
  formData.append('file', file);
  console.log(formData);
  
// eslint-disable-next-line
const response = await fetch("http://localhost:8080/addtemp", {
  method: 'POST',
  body: formData
}).then(response => {
  console.log('File uploaded successfully:', response);
  props.showAlert("Template Uploaded","success")
  // Do something with the file information, such as displaying it to the user
})
.catch(error => {
  console.error('Error uploading file:', error);
  // Handle the error as appropriate for your application
}); 
}

 
  return (
    <ThemeProvider theme={mdTheme}>
    <Box sx={{ display: "flex" }} style={{marginTop: "50px"}}>
      <CssBaseline />
      <AdminDrawer/>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Template Preview */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                <div className='pdf-container'>
        {/* show pdf conditionally (if we have one)  */}
        {viewPdf&&<><Worker workerUrl="https://unpkg.com/pdfjs-dist@3.5.141/build/pdf.worker.min.js">
          <Viewer fileUrl={viewPdf}
            plugins={[defaultLayoutPluginInstance]} />
      </Worker></>}

      {/* if we dont have pdf or viewPdf state is null */}
      {!viewPdf&&<>No Template selected</>}
      </div>
              </Paper>
            </Grid>
            {/* Editing Templates */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
              <form onSubmit={onSave}>
             <input  type="file" id="BtnBrowseHidden" name="files" onChange={handlePdfFileChange}  style={{"display": "none"}} />
            <label className="btn btn-outline-primary" htmlFor="BtnBrowseHidden" id="LblBrowse" style={{"marginBottom":"10px"}}>
            Upload Template
            </label>
            <button className="btn btn-outline-success" type='submit' value='submit'> Save Template</button>
            {/* <button className="btn btn-outline-danger"> Remove Template</button> */}
            </form>
              </Paper>
            </Grid>
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  </ThemeProvider>
  )
}

export default AddTemplates
