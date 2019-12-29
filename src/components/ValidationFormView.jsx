import React from 'react'
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CircularProgress from "@material-ui/core/CircularProgress";

export default function (props) {

    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">

            <div className={classes.row}>
                <TextField value={props.url}
                           onChange={props.onUrlChange}
                           id="outlined-basic"
                           label="URL"
                           variant="outlined"
                           className={classes.urlField}
                />

                <TextField value={props.depth}
                           onChange={props.onDepthChange}
                           id="outlined-basic"
                           label="Depth"
                           variant="outlined"
                           className={classes.inputField}
                />
            </div>


            <ExpansionPanel className={classes.panel}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                >
                    <Typography className={classes.heading}>Additional configuration</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
props.onSubmit
                    <Typography className={classes.heading}>Kocham Zosię</Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>


            <Button className={classes.button} variant="contained" color="primary" onClick={props.onSubmit}>
                Submit
            </Button>

        </form>)
}


const useStyles = makeStyles(theme => ({
    root: {
        margin: 'auto',
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    urlField: {
        flexGrow: 8,
        marginRight: 20
    },
    panel: {
        marginTop: 15,
        width: '100%'
    },
    button: {
        marginTop: 20,
        width: 150
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    row: {
        width: '100%',
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
    }
}));