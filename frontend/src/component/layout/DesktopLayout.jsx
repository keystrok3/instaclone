import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Sidebar from "../Navigation/Sidebar";
import Divider from "@mui/material/Divider";

const DesktopLayout = ({ children }) => {
    return (
        <Box sx={{ flexGrow: 1, background: '#fdfdfd' }}>
            <Grid container>
                <Grid item size={2} sx={{
                    position: 'relative',
                    borderRight: '1px solid #dbdbdb'
                }}>
                    <Sidebar />
                </Grid>
                <Grid item size={10}>
                    <main>
                        {children}
                    </main>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DesktopLayout;