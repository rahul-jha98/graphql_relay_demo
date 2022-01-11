class ConnectionHandler {
    constructor(cursorEncoder, cursorDecoder) {
        this.cursorEncoder = cursorEncoder;
        this.cursorDecoder = cursorDecoder;
    }

    static withStartText = (startText) => {
        return new ConnectionHandler((index) => Buffer.from(`${startText}-${index}`).toString('base64'),
            (cursor) => parseInt(Buffer.from(cursor, 'base64')
                .toString('ascii')
                .slice(startText.length + 1)));
    }

    getPaginatedList = (overFetchedListItems, startIndex, pageSize) => {
        const hasNextPage = overFetchedListItems.length > pageSize;
        if (hasNextPage) overFetchedListItems.splice(-1, 1);

        const edges = overFetchedListItems.map((item, idx) => {
            const listIndex = startIndex + idx;
            const cursor = this.cursorEncoder(listIndex, item);
            return { cursor, node: item }
        });

        const pageInfo = {
            hasNextPage, 
            endCursor: edges.length ? edges[edges.length - 1].cursor : null,
        }
        return {edges, pageInfo};
    }

    getPaginationProps = (paginatedProps, pageSize, defaultOffset = -1) => {
        console.log(defaultOffset, paginatedProps);
        const first = paginatedProps.first && paginatedProps.first <= pageSize ? paginatedProps.first : pageSize;
        const offset = paginatedProps.after ? this.cursorDecoder(paginatedProps.after) : defaultOffset;
        return { pageSize: first, offset }
    }
}

module.exports = ConnectionHandler;