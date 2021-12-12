
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Card, Tab, Grid, Badge } from '@mui/material';
import { Box } from '@mui/system';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function NewsItem(props) {
    const [expanded, setExpanded] = React.useState(false);
    const [isMoreShow, setIsMoreShow] = React.useState(false);
    const [isLessShow, setIsLessShow] = React.useState(true);
    const [isDescShow, setIsDescShow] = React.useState(true);
    const description=props.Desc?.split(/\s+/)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const onShareClickHandler = () => {
        let x = props.Url
        navigator.clipboard.writeText(x)
    }
    const readMoreClickHandler = () => {
        setIsMoreShow(true)
        setIsDescShow(false)
        setIsLessShow(false)
    }
    const showLessClickHandler = () => {
        setIsMoreShow(false)
        setIsDescShow(true)
        setIsLessShow(true)
    }
    const x = new Date(props.Time)
    const NewTime = x.toUTCString()

    return (
        <Grid key={props.Url} item xs={12} sm={6} md={4} lg={4}>
            <Badge color="primary" sx={{bgcolor:blue[200], marginBottom:'-45px',padding:'0 10px 2px', borderRadius:'20px'}}>
            {props.sources}
            </Badge>
            <Box sx={{ margin: 2 }}>
                <Card sx={{ border: '1px solid', borderColor: '#77D970', boxShadow: '0 0 5px #14279B' }}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: blue[800] }} aria-label="recipe">
                                {props.Count + 1}
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={props.Title?.split(/\s+/).length > 15 ? props.Title?.split(/\s+/).slice(0, 15).join(' ') + '...' : props.Title}
                        subheader={NewTime}
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image={props.Image}
                        alt="News Img"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.primary" textAlign="left">
                            {isDescShow && description.filter((elem) => elem.length !== 0).length > 10 ? description.slice(0, 15) + ` ...` : props.Desc}

                            {description.length > 15 && <Tab label='read more' sx={{ display: isMoreShow ? 'none' : 'inline' }} onClick={readMoreClickHandler} />}
                            <Tab label='read less' sx={{ display: isLessShow ? 'none' : 'inline' }} onClick={showLessClickHandler} />

                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <a href={props.Url} Target="blank" >
                            <IconButton aria-label="add to favorites">
                                <AutoStoriesIcon />
                            </IconButton>
                        </a>
                        <IconButton aria-label="share" onClick={onShareClickHandler}>
                            <ShareIcon />
                        </IconButton>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>Details</Typography>
                            <Typography paragraph>
                                {props.Content}
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            </Box>
        </Grid>
    );
}
