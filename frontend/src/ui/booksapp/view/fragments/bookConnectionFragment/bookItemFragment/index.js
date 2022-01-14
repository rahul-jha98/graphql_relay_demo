import { graphql, useFragment } from "react-relay";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import BookMetaData from "./bookMetaData";
import { useStoreActions } from "../../../store";

export default ({ bookNodeRef, showAuthorName }) => {
    const book = useFragment(graphql`
        fragment bookItemFragment on Book
            @argumentDefinitions(
                fetchAuthorName: { type: "Boolean!" }
            )
        {
            id
            name
            ...bookMetaDataFragment @arguments(fetchAuthorName: $fetchAuthorName)
        }
    `, bookNodeRef);

    const [, { setSelectedBookId }] = useStoreActions();

    return <Card elevation={1}>
        <CardActionArea onClick={() => setSelectedBookId(book.id)}>
            <CardContent sx={{padding: 1}}>
                <Typography gutterBottom variant="body1" component="div">
                    {book.name}
                </Typography>
                <BookMetaData bookNodeRef={book} showAuthorName={showAuthorName} />
            </CardContent>
        </CardActionArea>
    </Card>
}