import React from 'react';
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



const ValidationResultView = (props) => {

    const classes = useStyles();

    if (props.results === null) {
        return null;
    }


    const missingTitles = (
        <List component="nav" aria-label="main mailbox folders">
            {props.results.results['with-missing-title'].map((item, index) =>
                <ListItem key={index}>
                    <ListItemIcon>
                        <LinkIcon />
                    </ListItemIcon>
                    <ListItemText primary={item}/>
                </ListItem>
            )}
        </List>);

    const results = (<div>
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.heading}>URLs with missing titles</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                {missingTitles}
            </ExpansionPanelDetails>
        </ExpansionPanel>

    </div>)

    return (
        <div>
            {props.isLoading ? <CircularProgress/> : results}
        </div>
    );
};


const useStyles = makeStyles(theme => ({
    root: {
        width: '10%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export default ValidationResultView;