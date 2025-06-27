import { Container } from "@mui/material"



const CenteredLayout = ({ children}) => {

    return (
        <Container 
            maxWidth='lg'
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            {children}
        </Container>
    )
};

export default CenteredLayout;