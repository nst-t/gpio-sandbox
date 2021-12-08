import { ReactNode } from 'react';
import Typography from '@mui/material/Typography';

interface TitleProps {
  children: ReactNode;
}

export const Title = ({ children }: TitleProps) => (
  <Typography component="h2" variant="h6" color="primary" gutterBottom>
    {children}
  </Typography>
);
