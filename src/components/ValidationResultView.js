import React, {useState} from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import makeStyles from "@material-ui/core/styles/makeStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import LinkIcon from '@material-ui/icons/Link';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import {RadialBarChart, RadialBar, Cell, LabelList,} from "recharts";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';


const ValidationResultView = (props) => {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [popupMessage, setPopupMessage] = useState('');

    const handleClick = (event, popupMessage) => {
        setAnchorEl(event.currentTarget);
        setPopupMessage(popupMessage)
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    if (props.results === null) {
        return null;
    }

    if (props.results.parameters.depth == 0) {
        const messages = {
            no_open_graph: "You are not using open graph"
        }
    }

    const popupMessages = {
        openGraph: "Something more about og",
        headingsStructure: "Heaadings",
        missingDescritpions: "Descriptions are important!",
        missingHeading: "mis He",
        missingTitle: "mis Ti",
        descriptionWrongSize: "dws",
        unsafeUrl: "Unsaaafe",
        wrongUrl: "Good URL should'n contain characters other then letters, \n numbers and dashes. Also, it should't be longer then 120 characters.",
        wrongTitle: "Bad chars ",
        sitemap: "sitemap",
        robots: "r"
    }

    const fct = props.results.results.fct;
    let speed_results_component = null;
    let first_byte_results = null;
    const first_byte = props.results.results.time_to_first_byte;
    if (fct > 0) {
        const max_speed = 4000;
        let speed_result = max_speed - fct;
        if (speed_result < 0) {
            speed_result = 100
        }
        let speed = "";
        if (fct < 500) {
            speed = "very fast"
        } else if (fct < 1000) {
            speed = "fast"
        } else if (fct < 3000) {
            speed = "moderate"
        } else {
            speed = "slow"
        }
        let speed_result_byte = max_speed - first_byte;
        if (speed_result_byte < 0) {
            speed_result_byte = 100
        }
        const colors = ['#ffffff', '#8884d8', '#8dd1e1', '#82ca9d', '#d0ed57', '#ffc658', '#fa4848'];
        const data = [{uv: max_speed}, {uv: speed_result}, {uv: speed_result}, {uv: speed_result}, {uv: speed_result}, {uv: speed_result}, {uv: speed_result}];
        const data2 = [{uv: max_speed}, {uv: speed_result_byte}, {uv: speed_result_byte}, {uv: speed_result_byte}, {uv: speed_result_byte}, {uv: speed_result_byte}, {uv: speed_result_byte}];
        const rainbowChart = data => (
            <RadialBarChart width={500} height={300} innerRadius={20} outerRadius={140} barSize={10} data={data}
                            startAngle={180} endAngle={0}>
                <RadialBar minPointSize={15} background dataKey="uv">
                    {
                        data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index]}/>
                        ))
                    }
                    <LabelList position="insideEnd" fill="#fff" fontSize={1}/>
                </RadialBar>
            </RadialBarChart>
        )
        speed_results_component = (
            <Card className={classes.card} variant="outlined">
                <CardContent>
                    <h3>Page loading time</h3>
                    {rainbowChart(data)}
                    <p>It took <b>{fct}</b> ms to load first website content which is <b>{speed}</b>. </p>
                </CardContent>
            </Card>
        )
        first_byte_results = (
            <Card className={classes.card} variant="outlined">
                <CardContent>
                    <h3>Time to first byte</h3>
                    {rainbowChart(data2)}
                    <p>It took <b>{first_byte}</b> ms to get first byte of the website. </p>
                </CardContent>
            </Card>
        )
    }

    const noOpenGraphCounter = props.results.results.no_open_graph.length;
    const wrongHeadingsStructureCounter = props.results.results.heading_structure.length;
    const descriptionMissingCounter = props.results.results.description_missing.length;
    const headingMissingCounter = props.results.results.heading_missing.length;
    const descriptionWrongSizeCounter = props.results.results.description_wrong_size.length;
    const titleMissingCounter = props.results.results.page_missing_title.length;
    const unsafeUrlCounter = props.results.results.http_urls.length;
    const wrongUrlCounter = props.results.results.urls_wrong_chars.length;
    const brokenUrlCounter = props.results.results.broken_urls.length;


    const icon = success => {
        if (success) {
            return (
                <FavoriteIcon className={classes.success}/>
            )
        } else {
            return (
                <ReportProblemIcon className={classes.fail} color="secondary"/>
            )
        }
    }

    const panelHeadings = {
        openGraph: " Found " + noOpenGraphCounter + " pages with no Open Graph object.",
        headingsStructure: " Found " + wrongHeadingsStructureCounter + " pages with wrong headings' structure.",
        missingDescritpions: " Found " + descriptionMissingCounter + " pages with no description.",
        missingHeading: " Found " + headingMissingCounter + " pages with no h1 heading.",
        missingTitle: " Found " + titleMissingCounter + " pages with no title.",
        unsafeUrl: " Found " + unsafeUrlCounter + " pages with unsafe URL.",
        wrongUrl: " Found " + wrongUrlCounter + " pages with wrong URL.",
        descriptionWrongSize: " Found " + descriptionWrongSizeCounter + " pages with wrong size of description.",
        w3c: " W3C Validation results",
        brokenUrl: " Found " + brokenUrlCounter + " pages containing broken URLs."

    }
    const popup = (message) => {
        return (
            <ListItem>
                <Button variant="outlined" size="small" color="secondary" aria-describedby={id} type="button"
                        onClick={(event) => handleClick(event, message)}>
                    Find out more
                </Button>

            </ListItem>
        )
    }


    const panel = (panelHeading, panelContent, success) => {
        return (
            <ExpansionPanel className={classes.panel}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>{icon(success)}{panelHeading}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {panelContent}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
    const brokenUrl = (<List component="nav" aria-label="main mailbox folders">
        {props.results.results.broken_urls.map((item, index) =>
            <ListItem key={index} className={classes.listItem}>
                <ListItemText primary={
                    <Typography><b>On page</b> {item.url} <b>those urls are broken: </b></Typography>} secondary={
                    <List component="nav" aria-label="main mailbox folders">
                        {item.info.map((item2, index2) =>
                            <ListItem key={index2} className={classes.listItem}>
                                <ListItemIcon>
                                    <LinkIcon/>
                                </ListItemIcon>
                                <ListItemText primary={item2}/>
                            </ListItem>
                        )}
                    </List>
                }/>
            </ListItem>
        )}
        {popup("Something more about og")}
    </List>);
    const withoutOpenGraph = (<List component="nav" aria-label="main mailbox folders">
        {props.results.results.no_open_graph.map((item, index) =>
            <ListItem key={index} className={classes.listItem}>
                <ListItemIcon>
                    <LinkIcon/>
                </ListItemIcon>
                <ListItemText primary={item}/>

            </ListItem>
        )}
        {popup("Something more about og")}
    </List>);
    const missingDescription = (<List component="nav" aria-label="main mailbox folders">
        {props.results.results.description_missing.map((item, index) =>
            <ListItem key={index} className={classes.listItem}>
                <ListItemIcon>
                    <LinkIcon/>
                </ListItemIcon>
                <ListItemText primary={item}/>
            </ListItem>
        )}
        {popup(popupMessages.missingDescritpions)}
    </List>);
    const missingHeading = (<List component="nav" aria-label="main mailbox folders">
        {props.results.results.heading_missing.map((item, index) =>
            <ListItem key={index} className={classes.listItem}>
                <ListItemIcon>
                    <LinkIcon/>
                </ListItemIcon>
                <ListItemText primary={item}/>
            </ListItem>
        )}
        {popup(popupMessages.missingHeading)}
    </List>);
    const missingTitle = (<List component="nav" aria-label="main mailbox folders">
        {props.results.results.page_missing_title.map((item, index) =>
            <ListItem key={index} className={classes.listItem}>
                <ListItemIcon>
                    <LinkIcon/>
                </ListItemIcon>
                <ListItemText primary={item}/>
            </ListItem>
        )}
        {popup(popupMessages.missingHeading)}
    </List>);
    const w3c = (<List component="nav" aria-label="main mailbox folders">
        {props.results.results.w3c.map((item, index) =>
            <ListItem key={index} className={classes.listItem}>
                <ListItemIcon><LabelImportantIcon/></ListItemIcon>
                <ListItemText primary={item.message} secondary={
                    <b>{item.extract}</b>
                }/>
                Line: {item.lastLine}
            </ListItem>
        )}
        {popup(popupMessages.missingHeading)}
    </List>);
    const descriptionWrongSize = (<List component="nav" aria-label="main mailbox folders">
        {props.results.results.description_wrong_size.map((item, index) =>
            <ListItem key={index} className={classes.listItem}>
                <ListItemIcon>
                    <LinkIcon/>
                </ListItemIcon>
                <ListItemText primary={item}/>
            </ListItem>
        )}
        {popup(popupMessages.descriptionWrongSize)}
    </List>);
    const wrongHeadingsStructure = (<List component="nav" aria-label="main mailbox folders">
        {props.results.results.heading_structure.map((item, index) =>
            <ListItem key={index} className={classes.listItem}>
                <ListItemIcon>
                    <LinkIcon/>
                </ListItemIcon>
                <ListItemText primary={item}/>
            </ListItem>
        )}
        {popup(popupMessages.headingsStructure)}
    </List>);
    const unsafeUrl = (<List component="nav" aria-label="main mailbox folders">
        {props.results.results.http_urls.map((item, index) =>
            <ListItem key={index} className={classes.listItem}>
                <ListItemIcon>
                    <LinkIcon/>
                </ListItemIcon>
                <ListItemText primary={item}/>
            </ListItem>
        )}
        {popup(popupMessages.unsafeUrl)}
    </List>);
    const wrongUrl = (<List component="nav" aria-label="main mailbox folders">
        {props.results.results.urls_wrong_chars.map((item, index) =>
            <ListItem key={index} className={classes.listItem}>
                <ListItemIcon>
                    <LinkIcon/>
                </ListItemIcon>
                <ListItemText primary={item}/>
            </ListItem>
        )}
        {popup(popupMessages.wrongUrl)}
    </List>);
    const w3cResults = props.results.parameters.config.w3c ? panel(panelHeadings.w3c, w3c, wrongUrlCounter === 0) : null


    const results = (<div className={classes.root}>
        <div className={classes.row}>
            {first_byte_results}
            {speed_results_component}
        </div>
        {panel(panelHeadings.wrongUrl, wrongUrl, wrongUrlCounter === 0)}
        {panel(panelHeadings.brokenUrl, brokenUrl, (brokenUrlCounter === 0))}
        {panel(panelHeadings.headingsStructure, wrongHeadingsStructure, (wrongHeadingsStructureCounter === 0))}
        {panel(panelHeadings.openGraph, withoutOpenGraph, (noOpenGraphCounter === 0))}
        {panel(panelHeadings.descriptionWrongSize, descriptionWrongSize, (descriptionWrongSizeCounter === 0))}
        {panel(panelHeadings.missingDescritpions, missingDescription, (descriptionMissingCounter === 0))}
        {w3cResults}
        {panel(panelHeadings.missingHeading, missingHeading, (headingMissingCounter === 0))}
        {panel(panelHeadings.missingTitle, missingTitle, (titleMissingCounter === 0))}
        {panel(panelHeadings.unsafeUrl, unsafeUrl, (unsafeUrlCounter === 0))}
        {panel(" Sitemap.xml file", popup(popupMessages.robots), !props.results.results.missing_sitemap)}
        {panel(" Robots.txt file", popup(popupMessages.robots), !props.results.results.missing_robots)}
        <Popover
            id={id} className={classes.popup} open={open} anchorEl={anchorEl} onClose={handleClose}
            anchorOrigin={{vertical: 'top', horizontal: 'right',}}
            transformOrigin={{vertical: 'top', horizontal: 'left',}}>
            <Typography className={classes.typography}>{popupMessage}</Typography>
        </Popover>


    </div>)

    return (
        <div>
            {props.isLoading ? <CircularProgress/> : results}
        </div>
    );
};


const useStyles = makeStyles(theme => ({
    root: {
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        alignItems: 'center'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    panel: {
        marginTop: 15,
        width: '100%'

    },
    row: {
        width: '100%',
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
    },
    list: {
        margin: 'auto'
    },
    listItem: {
        marginTop: 2,
    },
    paper: {
        border: '1px',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
    },

    fail: {
        fontSize: theme.typography.pxToRem(15),

    },
    success: {
        color: "#4eca53",
        fontSize: theme.typography.pxToRem(15),
    },
    typography: {
        padding: theme.spacing(2),
        width: '50%',
        backgroundColor: "#f8f1d7",
    },

    popup: {
        color: "#f8f8bd",
    }

}));

export default ValidationResultView;