import { Button } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

export const GridContainer = ({ children, ...rest }) => {
  return (
    <Grid2 container pt={3} {...rest}>
      {children}
    </Grid2>
  );
};

export const GridItem = ({ children, ...rest }) => {
  return <Grid2 {...rest}>{children}</Grid2>;
};

export const ButtonContained = ({children, onClick, ...rest}) => {
  return <Button variant='contained' sx={{color: '#ffffff', fontWeight: 600}} onClick={onClick} {...rest}>{children}</Button>
}

export const ButtonOutlined = ({children, onClick, ...rest}) => {
  return <Button variant='outlined' onClick={onClick} {...rest}>{children}</Button>
}
