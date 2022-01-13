import { graphql, useFragment } from "react-relay";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import BookMetaData from "./bookMetaData";
import AuthorName from './authorName';

export default ({ bookNodeRef, showAuthorName }) => {
    const book = useFragment(graphql`
        fragment bookItemFragment on Book
            @argumentDefinitions(
                fetchAuthorName: { type: "Boolean!" }
            )
        {
            id
            name
            ...bookMetaDataFragment 
            author @include (if: $fetchAuthorName) {
                ...authorNameFragment
            }
        }
    `, bookNodeRef);

    return <Card elevation={2}>
        <CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="body1" component="div">
                    {book.name}
                </Typography>
                {showAuthorName && <AuthorName authorRef={book.author} />}
                <BookMetaData bookNodeRef={book} />
            </CardContent>
        </CardActionArea>
    </Card>
}