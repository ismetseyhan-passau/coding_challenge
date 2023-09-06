import {Fragment, ReactElement, useEffect, useState} from "react";
import {Startup} from "../../Types/Startup";
import {StartupHttpService} from "../../Http/Startup/Startup.http.service";
import {Container, Grid, Pagination} from "@mui/material";
import StartupCard from "./StartUpCard";
import Typography from "@mui/material/Typography";


export default function StartupList(): ReactElement {
    const [startups, setStartups] = useState<Startup[]>([]);
    const [index, setIndex] = useState(1);
    const [filteredStartups, setFilteredStartups] = useState<Startup[]>([]);
    const numberOfItems = 20;


    const calculatePage = (value: number): number => {
        return (value - 1) * numberOfItems;
    }

    useEffect(() => {
        async function fetchStartUps() {
            try {
                const startupData = await StartupHttpService.getAllStartups();
                setStartups(startupData);
                setFilteredStartups(startupData.slice(calculatePage(index), calculatePage(index) + numberOfItems));
            } catch (error) {
                console.log("There was an error:", error);
            }
        }

        fetchStartUps();

    }, []);


    const handleDeleteStartup = async (id: number) => {
        try {
            const updatedStartups = startups.filter((startup) => startup.id !== id);
            setStartups(updatedStartups);

        } catch (error) {
            console.log("There was an error:", error);
        }


    };


    const handleEditStartup = (updatedStartUp: Startup) => {
        const updatedList = startups.map((startUp) => {
            if (startUp.id === updatedStartUp.id) {
                return updatedStartUp;
            }
            return startUp;
        })
        setStartups(updatedList);
    };


    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setIndex(value);
        setFilteredStartups(startups.slice(calculatePage(value), calculatePage(value) + numberOfItems))
    };
    return <Fragment>
        <Container>
            <Grid container spacing={2}>
                {filteredStartups.map((startup) => (
                    <Grid item xs={12} sm={6} md={12} key={startup.id}>
                        <StartupCard startup={startup} onEdit={handleEditStartup} onDelete={handleDeleteStartup}/>
                    </Grid>
                ))}
            </Grid>
            <Typography>Page: {index}</Typography>
            <Pagination count={Math.ceil(startups.length / numberOfItems)} page={index} onChange={handleChange}/>
        </Container>
    </Fragment>;
}
