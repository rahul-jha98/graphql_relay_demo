import { graphql, useFragment } from "react-relay";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import BookMetaData from "./bookMetaData";
import CommentsList from "../../commentEdgesFragment";
import { useStoreActions } from "../../../store";

export default ({ bookNodeRef}) => {
    const book = useFragment(graphql`
        fragment bookItemFragment on Book
            @argumentDefinitions(
                fetchAuthorName: { type: "Boolean!" },
                includeRecentComments: { type: "Boolean!" }
            )
        {
            id
            name
            ...bookMetaDataFragment @arguments(fetchAuthorName: $fetchAuthorName)

            comments (first: 1) @include(if: $includeRecentComments) {
                edges {
                    cursor
                }
                ...commentEdgesFragment @arguments(fetchBookDetail: false, skipUser: true, skipTimestamp: true)
            }
        }
    `, bookNodeRef);

    const [, { setSelectedBookId }] = useStoreActions();

    return <Card elevation={1}>
        <CardActionArea onClick={() => setSelectedBookId(book.id)}>
            <CardContent sx={{padding: 1}}>
                <Typography gutterBottom variant="body1" component="div">
                    {book.name}
                </Typography>
                <BookMetaData bookNodeRef={book} />

                { book.comments?.edges?.length > 0 && <CommentsList commentConnectionRef={book.comments} disableDeleteOption={true}/> }
            </CardContent>
        </CardActionArea>
    </Card>
}