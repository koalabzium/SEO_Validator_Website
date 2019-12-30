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
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={props.checkSpeed}
                                    onChange={props.onCheckSpeedChange}
                                    value="Check Speed"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}/>  }
                            label=" Measure site speed "/>
                    </FormGroup>
                </ExpansionPanelDetails>
            </ExpansionPanel>


            <Button className={classes.button} variant="contained" color="secondary" onClick={props.onSubmit}>
                Analyze
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