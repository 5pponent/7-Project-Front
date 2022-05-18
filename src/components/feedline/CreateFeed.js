import { Button, Divider, FormControl, Grid, IconButton, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SmallProfile from "../SmallProfile";

export default function CreateFeed(props) {

  const closeDrawer = () => {
    props.getOpen(false);
  }

  return (
    <Stack sx={{ width: '500px' }}>
      <Grid container>
        <Grid item xs={10.5} p={2}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>피드 작성</Typography>
        </Grid>
        <Grid item xs={1.5} p={1.5}>
          <IconButton onClick={closeDrawer}><CloseIcon/></IconButton>
        </Grid>
      </Grid>
      <Divider/>
      <Grid container spacing={2} p={2}>
        <Grid item xs={3}>
          <SmallProfile name={props.name} image={props.image} direction='row' spacing={1} />
        </Grid>
        <Grid item xs={9}>
          <FormControl sx={{ minWidth: 120 }}>
            <Select size="small" label="공개 범위">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth rows={4} multiline></TextField>
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' fullWidth>게시</Button>
        </Grid>
      </Grid>
    </Stack>
  );
}