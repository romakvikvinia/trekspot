export const getAndReturnCurrentDay = () => {
    const today = new Date();
    const options = { month: 'short', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);

    return formattedDate;
}