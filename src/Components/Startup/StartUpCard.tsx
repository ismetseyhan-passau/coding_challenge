import React from "react";
import {Startup} from "../../Types/Startup";
import {Button, Card, CardContent, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";


interface StartupCardProps {
    startup: Startup;
    onDelete: (id: number) => void;
    onEdit: (startup: Startup) => void;
}

const StartupCard: React.FC<StartupCardProps> = ({startup, onDelete, onEdit}) => {

    const handleEditClick = () => {
        const EditedStartUp: Startup = {
            ...startup,
        };

        onEdit(EditedStartUp);
    };

    const handleDeleteClick = () => {
        onDelete(startup.id);
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{startup.name}</Typography>
                <Typography variant="body1" color="textSecondary">
                    {startup.shortDescription}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {startup.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Founded : {startup.dateFounded.getFullYear()}
                </Typography>
                <Grid container spacing={2} justifyContent="flex-end">
                    <Grid item>
                        <Button variant="outlined" color="primary" onClick={handleEditClick}>
                            Edit
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" color="error" onClick={handleDeleteClick}>
                            Delete
                        </Button>
                    </Grid>
                </Grid>

            </CardContent>
        </Card>
    );
};
export default StartupCard