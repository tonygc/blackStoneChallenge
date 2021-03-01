import { Box } from '@material-ui/core';
import { BlackButton } from './styled-buttons'

export default function header(){
    return(
    <Box align="right" mr={1} mb={1}>
        <BlackButton fullWidth size="small" variant="contained">BlackStone Challenge</BlackButton>
    </Box>
    );
}