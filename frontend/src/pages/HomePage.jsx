import DesktopLayout from "../component/layout/DesktopLayout";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const HomePage = () => {
    return (
        <DesktopLayout>
            <Box sx={{ padding: '2em' }}>
                <Typography variant="h4">Main Content</Typography>
                <Typography>
                    This is where the main content of your page will go. It will scroll independently of the sidebar.
                </Typography>
            </Box>
        </DesktopLayout>
    );
};

export default HomePage;