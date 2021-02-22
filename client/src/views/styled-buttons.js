import { grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

export const BlackButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(grey[900]),
      backgroundColor: grey[900],
      '&:hover': {
        backgroundColor: grey[700],
      },
    },
  }))(Button);