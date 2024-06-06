export const getTimeDifference = (timeString: string) => {
  const createAt = new Date(timeString);
  const currentDate = new Date();

  const createdHours =
    (currentDate.getTime() - createAt.getTime()) / (1000 * 60 * 60);

  return Math.floor(createdHours);
};
