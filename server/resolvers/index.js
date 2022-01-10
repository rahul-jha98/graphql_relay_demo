const timerResolver = async (_, args) => {
    const { ms } = args;
    await new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
    return ms;
}

const resolvers = {
    Query: {
        isOnline: () => true,
        timer: timerResolver,
    }
};

module.exports = resolvers;
